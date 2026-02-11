function Navbar({
  onHome,
  onLogin,
  onRegister,
  onDashboard,
  onCheckOrder,
  onProfile,
  onContact,
  isLoggedIn
}) {
  return (
    <div style={styles.nav}>
      <h3 style={{ cursor: "pointer" }} onClick={onHome}>
        🚚 Intelli-Chain
      </h3>

      <div style={styles.links}>
        <button onClick={onHome}>Home</button>
        <button onClick={onDashboard}>Dashboard</button>
        <button onClick={onCheckOrder}>Check Order</button>
        <button onClick={onContact}>Contact</button>

        {!isLoggedIn && <button onClick={onLogin}>Login</button>}
        {!isLoggedIn && <button onClick={onRegister}>Register</button>}

        {isLoggedIn && <button onClick={onProfile}>Profile</button>}
        {isLoggedIn && <button onClick={onHome}>Logout</button>}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    backgroundColor: "#222",
    color: "white"
  },
  links: {
    display: "flex",
    gap: "10px"
  }
};

export default Navbar;
