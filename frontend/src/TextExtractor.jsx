import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const TextExtractor = ({ pdfFile, setExtractedText, documentId, setDocumentId }) => {
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    // If we already have a documentId, we can fetch the document details
    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/documents/${documentId}`);
      if (response.data.text) {
        setExtractedText(response.data.text);
      }
      if (response.data.summary) {
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const handleExtractText = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", pdfFile); // Changed to match server expectation

    try {
      const response = await axios.post("http://localhost:5000/extract-text", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExtractedText(response.data.extractedText);
      if (response.data.documentId) {
        setDocumentId(response.data.documentId);
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!documentId) {
      alert("Please extract text from the PDF first.");
      return;
    }

    setSummarizing(true);
    try {
      const response = await axios.post("http://localhost:5000/summarize-text", {
        documentId: documentId
      });

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary: " + (error.response?.data?.error || error.message));
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleExtractText} disabled={loading || !pdfFile}>
          {loading ? "Extracting..." : "Extract Text"}
        </button>
      </div>

      {setExtractedText && (
        <div className="mt-4">
          <button 
            onClick={handleGenerateSummary} 
            disabled={summarizing || !documentId}
            className="ml-2"
          >
            {summarizing ? "Generating Summary..." : "Generate AI Summary"}
          </button>
        </div>
      )}

      {summary && (
        <div className="summary-section mt-4">
          <h3>📌 AI-Generated Summary</h3>
          <div className="summary-content">
            {summary.split('\n').map((line, index) => 
              line.trim() ? <p key={index}>🔹 {line}</p> : null
            )}
          </div>
        </div>
      )}
    </div>
  );
};

TextExtractor.propTypes = {
  pdfFile: PropTypes.object,
  setExtractedText: PropTypes.func.isRequired,
  documentId: PropTypes.string,
  setDocumentId: PropTypes.func
};

export default TextExtractor;