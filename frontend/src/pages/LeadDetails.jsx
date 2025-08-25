import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import LeadsPageNavbar from "../components/LeadsPageNavbar";
import Footer from "../components/Footer";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/lead/${id}`, {
          withCredentials: true,
        });
        setLead(response.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch lead");
        navigate("/leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!lead) return <p className="text-center mt-6">No lead found.</p>;

  return (
    <>
      <LeadsPageNavbar />
      <div className="min-h-screen mt-3 bg-gray-50 flex flex-col items-center p-6">
        
        <div className="w-full max-w-3xl mb-4">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            onClick={() => navigate("/leads")}
          >
            ← Back to Leads
          </button>
        </div>

        {/* Lead Detail Card */}
        <div className="w-full max-w-3xl mt-3 bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-indigo-700">
            Lead Details
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p>
              <strong>First Name:</strong> {lead.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {lead.last_name}
            </p>
            <p>
              <strong>Email:</strong> {lead.email}
            </p>
            <p>
              <strong>Phone:</strong> {lead.phone}
            </p>
            <p>
              <strong>Company:</strong> {lead.company}
            </p>
            <p>
              <strong>City:</strong> {lead.city}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${
                  lead.status === "won"
                    ? "bg-green-500"
                    : lead.status === "lost"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {lead.status}
              </span>
            </p>
            <p>
              <strong>Source:</strong> {lead.source}
            </p>
            <p>
              <strong>Score:</strong> {lead.score}
            </p>
            <p>
              <strong>Lead Value:</strong> {lead.lead_value}
            </p>
            <p>
              <strong>Qualified:</strong>{" "}
              {lead.is_qualified ? "✅ Yes" : "❌ No"}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LeadDetail;
