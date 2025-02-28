import React from 'react'

export default function Button({children,color,className}) {
  return (
    <button
    className={`btn ${className}`}
    style={{
      backgroundColor: color || "#D1A9F7",
      color: "#fff",
      borderRadius: "25px",
      padding: "0.5rem",
      textTransform: "uppercase",
      fontWeight: "bold",
    }}

    >
        {children}
    </button>
  )
}
