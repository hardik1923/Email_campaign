import React, { useState, useEffect } from "react";
import {
  PinpointClient,
  GetCampaignDateRangeKpiCommand,
} from "@aws-sdk/client-pinpoint";

const CampaignKpi = () => {
  const [startDate, setStartDate] = useState(new Date()); // Today's date by default
  const [endDate, setEndDate] = useState(new Date()); // Today's date by default
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const client = new PinpointClient(config);
      const input = {
        ApplicationId: "STRING_VALUE", // Replace with your application ID
        CampaignId: "STRING_VALUE", // Replace with your application ID
        //EndTime: toUtc8601(endDate),
        KpiName: "STRING_VALUE", // Replace with your KPI name
        //StartTime: toUtc8601(startDate),
      };
      const command = new GetCampaignDateRangeKpiCommand(input);
      const response = await client.send(command);
      setCampaignData(response.CampaignDateRangeKpiResponse);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); // Refetch data when dates change

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  // Function to convert a date to UTC 8601 format
  const toUtc8601 = (date) => {
    return date.toISOString().slice(0, 10) + "T00:00:00.000Z";
  };

  return (
    <div>
      <h2>Campaign KPI</h2>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate.toISOString().slice(0, 10)}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate.toISOString().slice(0, 10)}
          onChange={handleEndDateChange}
        />
      </div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <div className="error">Error: {error.message}</div>}
      {campaignData && (
        <div>
          {/* Display your campaign data here (e.g., using a table or chart) */}
          <p>Campaign ID: {campaignData.CampaignId}</p>
          <p>Start Time: {campaignData.StartTime.toISOString()}</p>
          <p>End Time: {campaignData.EndTime.toISOString()}</p>
          {/* Access other data points from campaignData as needed */}
        </div>
      )}
    </div>
  );
};

export default CampaignKpi;
