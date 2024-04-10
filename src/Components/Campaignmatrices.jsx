import MetricCard from "./MetricCard.jsx";

const CompanyMetrics = () => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-between mb-3">
        <MetricCard
          valueColor={"text-success"}
          value={"$406,411.29"}
          metric={"Total Revenue"}
        />
        <MetricCard value={"$620"} metric={"Total Jobs Avg"} />
        <MetricCard value={"655"} metric={"Tickets Created"} />
        <MetricCard value={"735"} metric={"Tickets Scheduled"} />
      </div>
      <div className="d-flex flex-row justify-content-between mb-3">
        <MetricCard
          valueColor={"text-danger"}
          value={"$110,448.8"}
          metric={"Outstanding Amount"}
        />
        <MetricCard value={"105"} metric={"Memberships Sold"} />
        <MetricCard value={"436"} metric={"Jobs Completed"} />
        <MetricCard value={"65"} metric={"Total Canceled"} />
      </div>
    </div>
  );
};

export default CompanyMetrics;