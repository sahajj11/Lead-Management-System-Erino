import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import LeadsPageNavbar from "../components/LeadsPageNavbar";
import Footer from "../components/Footer";

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axiosInstance.get(`/lead/${id}`, {
          withCredentials: true,
        });
        setLead(res.data);
      } catch (err) {
        console.error("Error fetching lead:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/lead/${id}`, lead, {
        withCredentials: true,
      });
      alert("Lead created successfully!");
      navigate(`/leads/${id}`);
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-600">Loading...</p>;
  if (!lead)
    return <p className="text-center mt-6 text-red-500">Lead not found</p>;

  return (
    <>
      <LeadsPageNavbar />
      <div className="min-h-screen mt-7 bg-gray-50 flex flex-col items-center p-6">
        
        <div className="w-full max-w-2xl mb-4">
          <button
            className="px-4 cursor-pointer py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            onClick={() => navigate("/leads")}
          >
            ← Back to Leads
          </button>
        </div>

        {/* Edit Form */}
        <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
            Edit Lead
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="first_name"
              value={lead.first_name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={lead.last_name || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={lead.email || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="phone"
              value={lead.phone || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="company"
              value={lead.company || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Company"
              required
            />
            <input
              type="text"
              name="city"
              value={lead.city || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="City"
              required
            />

            <select
              name="status"
              value={lead.status || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>

            <select
              name="source"
              value={lead.source || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Source</option>
              <option value="website">Website</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="referral">Referral</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>

            <input
              type="number"
              name="score"
              value={lead.score || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Score"
            />

            <input
              type="number"
              name="lead_value"
              value={lead.lead_value || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Lead Value"
            />

           
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full cursor-pointer py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
              >
                Update Lead
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditLead;
