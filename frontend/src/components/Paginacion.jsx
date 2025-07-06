import React from "react";

function Paginacion() {
  const styles = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginTop: "30px",
    },
    link: {
      color: "#666",
      textDecoration: "none",
      fontSize: "16px",
      transition: "color 0.3s ease",
    },
    separator: {
      color: "#666",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.pagination}>
      <a href="#" style={styles.link}>Anterior</a>
      <span style={styles.separator}>/</span>
      <a href="#" style={styles.link}>Siguiente</a>
    </div>
  );
}

export default Paginacion;
