import React, { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/dashboard")
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Shipment Dashboard</h2>

      {data.length === 0 && <p>No shipment data available</p>}

      {data.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px"
          }}
        >
          <p><b>Shipment ID:</b> {item.shipmentId}</p>
          <p><b>Product:</b> {item.product}</p>
          <p><b>From:</b> {item.source}</p>
          <p><b>To:</b> {item.destination}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{ color: item.analysis.status === "ABNORMAL" ? "red" : "green" }}>
              {item.analysis.status}
            </span>
          </p>

          <pre style={{ background: "#f4f4f4", padding: "10px" }}>
            {item.genai_report}
          </pre>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
