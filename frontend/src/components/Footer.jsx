import React from "react";

const Footer = () => {
  return (
    <footer
      className="w-full text-white py-4 mt-6 rounded-tl-3xl rounded-tr-3xl shadow-md text-center"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #6d28d9)",
      }}
    >
      <p className="text-sm">
        © {new Date().getFullYear()} Made by <span className="font-semibold">Sahaj Rajput</span> for <span className="font-semibold">Erino</span>.
      </p>
      <p className="text-xs mt-1">Built with MERN Stack</p>
    </footer>
  );
};

export default Footer;
