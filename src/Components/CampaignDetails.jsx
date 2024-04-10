import React from 'react';
import './CampaignDetails.css'; // Import CSS file for styling

const CampaignDetails = ({ details }) => {
  const {
    ApplicationId,
    CampaignId,
    End,
    ExecutionMetrics,
    Id,
    Result,
    ScheduledStart,
    Start,
    State,
    SuccessfulEndpointCount,
    TotalEndpointCount,
    TreatmentId,
  } = details;

  return (
    <div className="campaign-details-container">
      <h2>Campaign Details</h2>
      <div className="detail">
        <span className="label">Application ID:</span>
        <span className="value">{ApplicationId}</span>
      </div>
      <div className="detail">
        <span className="label">Campaign ID:</span>
        <span className="value">{CampaignId}</span>
      </div>
      <div className="detail">
        <span className="label">End:</span>
        <span className="value">{End}</span>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default CampaignDetails;
