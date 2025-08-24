import React from "react";

const LeadsPageNavbar = () => {
  return (
    <>
      <nav
        className="w-full rounded-bl-3xl rounded-br-3xl text-white px-6 py-4 shadow-lg flex justify-between items-center"
        style={{
          background: "linear-gradient(135deg, #4f46e5, #6d28d9)",
        }}
      >
        {/* Left - Brand / Greeting */}
        <div className="flex items-center gap-3">
          
          <p className="text-lg font-semibold tracking-wide">
            Welcome, <span className="font-bold">User</span>
          </p>
        </div>

        {/* Right - Logout Button */}
        <button
          className="px-5 py-2.5 bg-white text-indigo-700 font-semibold rounded-xl shadow-md 
                     hover:bg-indigo-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default LeadsPageNavbar;
