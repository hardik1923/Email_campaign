import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./singlecampaign.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import axios from "axios";
//import MetricCard from "./Components/MetricCard";
//import { LineChart } from "@mui/x-charts/LineChart";
//import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
function SingleCampaign() {
  ChartJS.register(
    ArcElement,
    LineElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    PointElement
  );
  const base_url = "";
  const campaignId = useSelector((state) => state.campaign.campaignId);
  const campaignname = useSelector((state) => state.campaign.name);
  const [campdetails, setcampdetails] = useState({});
  const [campopens, setcampopens] = useState(0);
  const [campclicks, setcampclicks] = useState(0);
  const [campbounces, setcampbounces] = useState(0);
  useEffect(() => {
    const getcampdetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/campaigns/getcampactivities/${campaignId}`
        );
        if (response.status === 201) {
          const data = await response.json();
          console.log("data", data.campaigndata.Item[0]);
          setcampdetails(data.campaigndata.Item[0]);
        }
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        // Handle errors appropriately, e.g., display an error message to the user
      }
    };
    getcampdetails();
  }, []);

  const getcampaignopens = async () => {
    const response = axios.post(`http://localhost:3000/campaigns/getmetrices`, {
      kpiname: "direct-email-opens-grouped-by-campaign-activity",
      campaignid: campaignId,
    });
    if (response.status === 201) {
      const data = await response.json();
      setcampopens(data.data);
    }
  };

  const getcampaignclicks = async () => {
    const response = axios.post(`http://localhost:3000/campaigns/getmetrices`, {
      kpiname: "clicks-grouped-by-campaign-activity",
      campaignid: campaignId,
    });
    if (response.status === 201) {
      const data = await response.json();
      setcampopens(data.data);
    }
  };
  const getcampaignbounces = async () => {
    const response = axios.post(`http://localhost:3000/campaigns/getmetrices`, {
      kpiname: "direct-email-opens-grouped-by-campaign-activity",
      campaignid: campaignId,
    });
    if (response.status === 201) {
      const data = await response.json();
      setcampopens(data.data);
    }
  };

  useEffect(() => {
    getcampaignopens();
    getcampaignclicks();
    getcampaignbounces();
  }, []);

  const data = {
    labels: ["Failed ", "Total", "success"],
    datasets: [
      {
        label: "Campaign Details",
        data: [
          campdetails?.TotalEndpointCount -
            campdetails?.SuccessfulEndpointCount,
          campdetails?.TotalEndpointCount,
          campdetails?.SuccessfulEndpointCount,
        ],
        backgroundColor: ["red", "blue", "green"],
        hoverOffset: 4,
      },
    ],
  };
  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Opens",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="singlecampaign">
      <div className="singlecampaign-row">
        <h4>
          Campaign Name: <span className="campaign-name">{campaignname}</span>
        </h4>
      </div>

      <div className="singlecampaign-row">
        <p>
          <b>Status:</b> {campdetails?.Result}
        </p>
        {campdetails && (
          <p>
            <b>Started At:</b> {campdetails.Start}
          </p>
        )}
        {campdetails && (
          <p>
            <b>Ended At:</b> {campdetails.End}
          </p>
        )}
      </div>

      <div className="singlecampaign-row">
        <div className="kpis">
          <div class="kpi-box">
            <div class="kpi-title">SuccessfulEndpointCount</div>
            <div class="kpi-value">{campdetails?.SuccessfulEndpointCount}</div>
            <div class="kpi-description"></div>
          </div>
          <div class="kpi-box">
            <div class="kpi-title">FailedEndpointCount</div>
            <div class="kpi-value">
              {campdetails?.TotalEndpointCount -
                campdetails?.SuccessfulEndpointCount}
            </div>
            <div class="kpi-description"></div>
          </div>
          <div class="kpi-box">
            <div class="kpi-title">TotalEndpointsCounts</div>
            <div class="kpi-value">{campdetails?.TotalEndpointCount}</div>
            <div class="kpi-description"></div>
          </div>
        </div>
      </div>
      <div className="pie-charts">
        <Pie data={data} />
      </div>

      {/* <div className="Line-charts">
        <Line data={data1} options={options} height={100} width={100} />
      </div> */}
      {/* <LineChart
        title="Hello"
        sx={{ color: "black" }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={600}
        height={400}
      /> */}
      <div className="singlecampaign-row">
        <div className="kpis">
          <div class="kpi-box">
            <div class="kpi-title">Opens</div>
            <div class="kpi-value">{campopens}</div>
            <div class="kpi-description"></div>
          </div>
          <div class="kpi-box">
            <div class="kpi-title">Clicks</div>
            <div class="kpi-value">{campclicks}</div>
            <div class="kpi-description"></div>
          </div>
          <div class="kpi-box">
            <div class="kpi-title">Bounces</div>
            <div class="kpi-value">{campbounces}</div>
            <div class="kpi-description"></div>
          </div>
          <div class="kpi-box">
            <div class="kpi-title">Total Send</div>
            <div class="kpi-value">{campbounces}</div>
            <div class="kpi-description"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCampaign;
