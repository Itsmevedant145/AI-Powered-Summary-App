const express = require("express");
const mongoose = require("mongoose");
const pdfParse = require("pdf-parse");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const fs = require("fs-extra");

dotenv.config();
const app = express();
const port = 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Ensure uploads directory exists
fs.ensureDirSync("uploads/");

// ✅ Multer setup (for handling PDF uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Create a unique filename while preserving the original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newFilename = uniqueSuffix + "-" + file.originalname;
    cb(null, newFilename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Define Schema & Model for Storing PDF Data
const DocumentSchema = new mongoose.Schema({
  filename: String,
  text: String,
  summary: String,
});
const Document = mongoose.model("Document", DocumentSchema);

// ✅ Route: Upload PDF & Extract Text
app.post("/extract-text", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "❌ No file uploaded!" });
    }

    // ✅ Use the correct filename from multer's `req.file.filename`
    const savedFilename = req.file.filename; // This is the correct name used in storage
    const pdfBuffer = await fs.readFile(req.file.path);
    const data = await pdfParse(pdfBuffer);

    console.log("📄 Extracted Text:", data.text.substring(0, 500)); // ✅ Debugging: log first 500 chars

    // ✅ Store extracted text in MongoDB
    const newDocument = new Document({
      filename: savedFilename, // ✅ Use stored filename instead of originalname
      text: data.text,
      summary: "",
    });

    await newDocument.save();
    res.json({ extractedText: data.text, documentId: newDocument._id });

    // ✅ Delete uploaded file after processing
    await fs.unlink(req.file.path);
  } catch (error) {
    console.error("❌ PDF Parsing Error:", error);
    res.status(500).json({ error: "Failed to parse PDF", details: error.message });
  }
});

// ✅ Route: Summarize Extracted Text using Google Gemini AI
app.post("/summarize-text", async (req, res) => {
  try {
    const { documentId } = req.body;

    // Fetch extracted text from MongoDB
    const document = await Document.findById(documentId);
    if (!document) return res.status(404).json({ error: "❌ Document not found!" });

    // ✅ Handle large PDFs by limiting text to 4000 characters
    const shortenedText = document.text.slice(0, 4000);

    // ✅ Call Google Gemini AI API
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(API_URL, {
      contents: [
        {
          parts: [{ text: `Summarize the following document in bullet points:\n\n${shortenedText}` }],
        },
      ],
    });

    // ✅ Extract summary from response
    const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No summary generated.";

    // ✅ Store summary in MongoDB
    document.summary = summary;
    await document.save();

    res.json({ summary });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to summarize text", details: error.message });
  }
});

// ✅ Route: Fetch Extracted Text & Summary
app.get("/documents/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ error: "❌ Document not found!" });

    res.json(document);
  } catch (error) {
    console.error("❌ Fetch Document Error:", error);
    res.status(500).json({ error: "Failed to fetch document", details: error.message });
  }
});

// ✅ Start Server
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
