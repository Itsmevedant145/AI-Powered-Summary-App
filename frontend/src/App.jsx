import { useState } from "react";
import PdfUploader from "./PdfUploader";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import "./SummaryCard.css";

function App() {
  const [documentId, setDocumentId] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [summary, setSummary] = useState("");

  const fetchDocumentData = async () => {
    if (!documentId) return;

    try {
      const response = await axios.get(`http://localhost:5000/documents/${documentId}`);
      setDocumentData(response.data);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
    }
  };

  const handleSummarize = async () => {
    if (!documentId) return;

    try {
      const response = await axios.post("http://localhost:5000/summarize-text", { documentId });
      console.log("✅ Summary Response:", response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("❌ Summary Error:", error);
    }
  };

  return (
    <div>
      <h1>PDF Extractor & Summarizer</h1>
      <PdfUploader setDocumentId={setDocumentId} />

      {documentId && (
        <div>
          <button onClick={fetchDocumentData}>Fetch Extracted Text</button>
          <button onClick={handleSummarize}>Summarize Text</button>
        </div>
      )}

      {documentData && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{documentData.text.substring(0, 1000)}...</p> {/* Showing first 1000 chars */}
        </div>
      )}

      {summary && (
        <div>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
