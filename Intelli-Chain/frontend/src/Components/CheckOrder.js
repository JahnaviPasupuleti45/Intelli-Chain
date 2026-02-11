import React from "react";

function CheckOrder() {
  return (
    <div style={styles.card}>
      <h2>Check Order</h2>

      <input style={styles.input} placeholder="Shipment ID" />
      <input style={styles.input} placeholder="Product Name" />
      <input style={styles.input} placeholder="Source" />
      <input style={styles.input} placeholder="Destination" />
      <input style={styles.input} type="date" />

      <button style={styles.btn}>Check Status</button>
    </div>
  );
}

const styles = {
  card: {
    width: "360px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center"
  },
  input: {
    width: "100%",
    margin: "6px 0",
    padding: "8px"
  },
  btn: {
    width: "100%",
    padding: "8px",
    backgroundColor: "green",
    color: "white",
    border: "none"
  }
};

export default CheckOrder;
