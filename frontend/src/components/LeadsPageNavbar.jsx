import React, { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { useNavigate } from "react-router-dom";

const LeadsPageNavbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      alert("Logout successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
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
            Welcome,{" "}
            <span className="font-bold">{user ? user.email : "Guest"}</span>
          </p>
        </div>

        <button
          onClick={handleLogOut}
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
