import React from "react";

const Navbar = () => {
  return (
    <>
      <nav
        className="w-full rounded-bl-3xl rounded-br-3xl text-white px-6 py-4 shadow-lg flex justify-between items-center"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #6d28d9)",
        }}
      >
        
        <div className="flex items-center gap-3">
          
          <p className="text-lg font-semibold tracking-wide">
           Lead Manager
          </p>
        </div>

        
      </nav>
    </>
  );
};

export default Navbar;
