import React, { useEffect, useState } from "react";
import "./Analytics.css";
const Analytics = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="analytics-main">
      <h3>{currentDate.toDateString()}</h3>
      <div className="container">
        <Card title="Total Camapigns" value="12,567" />
        <Card title="Emails Send" value="254" />
        <Card title="Templates" value="45" />
        <Card title="All Unsubscribers" value="45" />
        <Card title="Lists" value="45" />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <i class="envelope outline icon"></i>
      <h2 style={{ color: "rgb(238, 85, 102)" }}>{title}</h2>
      <p>{value}</p>
    </div>
  );
};

export default Analytics;
