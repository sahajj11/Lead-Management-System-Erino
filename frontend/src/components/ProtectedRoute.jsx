import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/verify", {
          withCredentials: true, 
        });

        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
         alert("Unauthorized (401). Please login first.")
        console.error(error)
      }
    };

    checkAuth();
  }, []);

  // While checking, show nothing / loader
  if (isAuthenticated === null) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
