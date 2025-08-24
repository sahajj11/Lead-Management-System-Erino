// src/pages/LeadsTable.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import LeadsPageNavbar from "../components/LeadsPageNavbar";
import Footer from "../components/Footer";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    email: "",
    name: "",
    company: "",
    city: "",
    status: "",
    source: "",
    limit: 20,
  });

  const navigate = useNavigate();

  const fetchLeads = async (page = 1, filters = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/lead/get-leads", {
        params: { page, ...filters },
        withCredentials: true,
      });
      setLeads(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(page, filters);
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      email: "",
      name: "",
      company: "",
      city: "",
      status: "",
      source: "",
      limit: 20,
    });
    setPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axiosInstance.delete(`/lead/${id}`, { withCredentials: true });
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete lead");
    }
  };

  

  return (
    <>
      <LeadsPageNavbar />
      <div className="p-6">
        {/* Filter + Create Row */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={filters.email}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-40 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-40 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={filters.company}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-40 focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:ring-2 focus:ring-indigo-500"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
              <option value="won">Won</option>
            </select>
            <select
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Sources</option>
              <option value="website">Website</option>
              <option value="facebook_ads">Facebook Ads</option>
              <option value="google_ads">Google Ads</option>
              <option value="referral">Referral</option>
              <option value="events">Events</option>
              <option value="other">Other</option>
            </select>

            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800"
            >
              Reset
            </button>

            {/* Spacer + Create Button */}
            <div className="ml-auto">
              <button
                onClick={() => navigate("/leads/create")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
              >
                + Create Lead
              </button>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr className="text-left text-gray-600 text-sm">
                {[
                  "First Name",
                  "Last Name",
                  "Email",
                  "Phone",
                  "Company",
                  "City",
                  "Status",
                  "Source",
                  "Score",
                  "Lead Value",
                  "Qualified",
                  "Actions",
                ].map((head) => (
                  <th key={head} className="px-4 py-3 border-b">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-50 transition-colors text-sm"
                >
                  <td className="px-4 py-3 border-b">{lead.first_name}</td>
                  <td className="px-4 py-3 border-b">{lead.last_name}</td>
                  <td className="px-4 py-3 border-b">{lead.email}</td>
                  <td className="px-4 py-3 border-b">{lead.phone}</td>
                  <td className="px-4 py-3 border-b">{lead.company}</td>
                  <td className="px-4 py-3 border-b">{lead.city}</td>
                  <td className="px-4 py-3 border-b">{lead.status}</td>
                  <td className="px-4 py-3 border-b">{lead.source}</td>
                  <td className="px-4 py-3 border-b">{lead.score}</td>
                  <td className="px-4 py-3 border-b">{lead.lead_value}</td>
                  <td className="px-4 py-3 border-b">
                    {lead.is_qualified ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-600 font-medium">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b flex gap-2">
                    <button
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/leads/${lead._id}/edit`)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(lead._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan="12"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => fetchLeads(page - 1, filters)}
            disabled={page === 1 || loading}
          >
            ← Previous
          </button>
          <span className="text-gray-600 text-sm">
            Page <strong>{page}</strong> of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm disabled:opacity-50"
            onClick={() => fetchLeads(page + 1, filters)}
            disabled={page === totalPages || loading}
          >
            Next →
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LeadsTable;
