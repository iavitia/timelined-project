import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="bg-white text-center">
      Copyright &copy; {new Date().getFullYear()} Timelined
    </footer>
  );
}
