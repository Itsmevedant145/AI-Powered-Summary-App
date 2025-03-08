import React from "react";
import PropTypes from "prop-types";
import './SummaryCard.css';

const SummaryCard = ({ summary }) => {
  if (!summary) {
    return (
      <div className="summary-card">
        <h4>📌 AI-Generated Summary</h4>
        <p>No summary available yet.</p>
      </div>
    );
  }

  const summaryStr = String(summary);

  return (
    <div className="summary-card">
      <h4 className="summary-title">📌 AI-Generated Summary</h4>
      <ul className="summary-list">
        {summaryStr
          .split("\n")
          .filter((point) => point.trim().length > 0)
          .map((point, index) => (
            <li key={index} className="summary-item">🔹 {point}</li>
          ))}
      </ul>
    </div>
  );
};

SummaryCard.propTypes = {
  summary: PropTypes.string,
};

SummaryCard.defaultProps = {
  summary: "",
};

export default SummaryCard;
