import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import LeadsPageNavbar from "../components/LeadsPageNavbar";
import Footer from "../components/Footer";

const CreateLead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    source: "other",
    status: "new",
    score: 0,
    lead_value: 0,
    last_activity_at: "",
    is_qualified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/lead/create-lead", formData, {
        withCredentials: true,
      });
      alert("Lead created successfully!");
      navigate("/leads");
    } catch (err) {
      console.error(err);
      alert("Failed to create lead");
    }
  };

  return (
    <>
      <LeadsPageNavbar />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
       
        <div className="w-full max-w-2xl mb-4">
          <button
            className="px-4 cursor-pointer py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            onClick={() => navigate("/leads")}
          >
            ← Back to Leads
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
            Create Lead
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
           
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
           
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
           
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

           
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="website">Website</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="referral">Referral</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>

           
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>

            
            <input
              type="number"
              name="score"
              placeholder="Score"
              value={formData.score}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            
            <input
              type="number"
              name="lead_value"
              placeholder="Lead Value"
              value={formData.lead_value}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            
            <input
              type="date"
              name="last_activity_at"
              value={formData.last_activity_at}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            
            <label className="flex items-center gap-2 col-span-1 md:col-span-2">
              <input
                type="checkbox"
                name="is_qualified"
                checked={formData.is_qualified}
                onChange={handleChange}
              />
              Qualified
            </label>
          </div>

          
          <button
            type="submit"
            className="mt-6 cursor-pointer w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Create Lead
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateLead;
