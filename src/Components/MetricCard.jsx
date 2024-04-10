const MetricCard = (props) => {
    return (
      <div
        style={{
          borderLeft: "8px solid #7FFFD4",
          color:'black',
          margin:'10px'
        }}
        className={"bg-white shadow ps-3 pt-3 fs-5 fw-semibold"}>
        <p className={props.valueColor}>{props.value}</p>
        <p>{props.metric}</p>
      </div>
    );
  };
  
  export default MetricCard;