import React, { useState } from "react";

function Register({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(async res => {
        if (res.status === 400) {
          alert("Email already registered");
        } else {
          alert("Customer registered successfully!");
          setForm({ name: "", email: "", password: "", phone: "" });
        }
      })
      .catch(() => alert("Backend not running"));
  };

  return (
    <div style={styles.card}>
      <h2>Customer Registration</h2>
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={styles.input} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={styles.input} />

      <button style={styles.btn} onClick={handleRegister}>Register</button>

      <p>
        Already registered? <span style={styles.link} onClick={onBack}>Login</span>
      </p>
    </div>
  );
}

const styles = {
  card: { width: "340px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center" },
  input: { width: "100%", margin: "6px 0", padding: "8px" },
  btn: { width: "100%", padding: "8px", backgroundColor: "green", color: "white", border: "none" },
  link: { color: "blue", cursor: "pointer" }
};

export default Register;
