import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const savedReports = JSON.parse(localStorage.getItem("claimReports") || "[]");
    setReports(savedReports);
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, fromDate, toDate, selectedCategory]);

  const filterReports = () => {
    let filtered = [...reports];

    if (fromDate) {
      filtered = filtered.filter((r) => new Date(r.timestamp) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter((r) => new Date(r.timestamp) <= new Date(toDate));
    }

    if (selectedCategory) {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    setFilteredReports(filtered);
  };

  // Graph Data
  const trendData = filteredReports.reduce((acc, report) => {
    const date = new Date(report.timestamp).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);
    if (existing) existing.count += 1;
    else acc.push({ date, count: 1 });
    return acc;
  }, []);

  const categoryData = ["Water", "Electricity", "Roads", "Other"].map((cat) => ({
    name: cat,
    value: filteredReports.filter((r) => r.category === cat).length,
  }));

  return (
    <div className="p-6 md:p-10 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">📊 Reports Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Roads">Roads</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" outerRadius={90} label>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reports Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h2 className="text-xl font-semibold mb-4">Reports by Day</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">📋 Report Details</h2>
        {filteredReports.length === 0 ? (
          <p className="text-gray-500">No reports found for the selected filters.</p>
        ) : (
          <div className="grid gap-4">
            {filteredReports.map((report, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                <p><strong>Category:</strong> {report.category || "Not Provided"}</p>
                <p><strong>Type:</strong> {report.type || "Not Provided"}</p>
                <p><strong>Date:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                <p><strong>Details:</strong> {report.content || "No details entered."}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
