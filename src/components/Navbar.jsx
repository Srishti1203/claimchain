import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-600">ClaimChain</Link>
      <div className="flex gap-4">
        <Link to="/report" className="hover:underline">Report</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;  // <-- Ensure this line is present
