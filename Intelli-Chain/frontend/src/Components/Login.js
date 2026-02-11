import React, { useState } from "react";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        alert("Login Successful");
        onLogin(data.user);
      })
      .catch(() => alert("Invalid Email or Password"));
  };

  return (
    <div style={styles.card}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />

      <button style={styles.btn} onClick={handleLogin}>Login</button>
    </div>
  );
}

const styles = {
  card: { width: "300px", margin: "120px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" },
  input: { width: "100%", margin: "8px 0", padding: "8px" },
  btn: { width: "100%", padding: "8px", background: "green", color: "white", border: "none" }
};

export default Login;
