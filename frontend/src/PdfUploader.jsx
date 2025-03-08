import React, { useState } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa"; // Upload Icon
import { ImSpinner2 } from "react-icons/im"; // Loading Spinner
import SummaryCard from "./SummaryCard";  

const PdfUploader = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      setError("⚠️ Please select a PDF file first.");
      return;
    }

    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      // Upload the PDF and get document ID
      const uploadResponse = await axios.post("http://localhost:5000/extract-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const documentId = uploadResponse.data.documentId;

      // Fetch summary
      const summaryResponse = await axios.post("http://localhost:5000/summarize-text", { documentId });
      setSummary(summaryResponse.data.summary);
    } catch (err) {
      setError("❌ Error processing PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📄 Upload a PDF for AI Summary</h2>

      {/* File Upload Box */}
      <label className="upload-box">
        <FaFileUpload className="upload-icon" />
        <span>{pdfFile ? pdfFile.name : "Click to select a file"}</span>
        <input type="file" accept="application/pdf" onChange={handleFileChange} hidden />
      </label>

      {/* 🚀 Upload & Summarize Button */}
      <button className="upload-button" onClick={handleUpload} disabled={loading}>
        {loading ? <ImSpinner2 className="loading-spinner" /> : "Upload & Summarize"}
      </button>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Summary Display */}
      <SummaryCard summary={summary} />
    </div>
  );
};

export default PdfUploader;
