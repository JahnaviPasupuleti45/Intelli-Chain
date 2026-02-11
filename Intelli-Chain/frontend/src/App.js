import React, { useState } from "react";
import Dashboard from './Dashboard';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import CheckOrder from './Components/CheckOrder';
import Contact from './Components/Contact';
import Profile from './Components/Profile';


function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar
        onHome={() => setPage("home")}
        onLogin={() => setPage("login")}
        onRegister={() => setPage("register")}
        onDashboard={() => setPage("dashboard")}
        onCheckOrder={() => setPage("checkorder")}
        onContact={() => setPage("contact")}
        onProfile={()=> setPage("profile")}
        isLoggedIn={!!user}
      />

      {page === "home" && <Home />}
      {page === "login" && <Login onLogin={(u) => { setUser(u); setPage("dashboard"); }} />}
      {page === "register" && <Register />}
      {page === "dashboard" && <Dashboard />}
      {page === "checkorder" && <CheckOrder />}
      {page === "contact" && <Contact/>}
      {page === "profile" && <Profile/>}

    </>
  );
}

export default App;
