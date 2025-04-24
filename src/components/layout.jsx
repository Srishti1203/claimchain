import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">ClaimChain</Link>
        <div className="flex gap-4">
          <Link to="/report" className="hover:underline">Report</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </div>
      </nav>
      <main className="p-6 flex-1">{children}</main>
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
        © 2025 ClaimChain • Built for HACKHAZARDS
      </footer>
    </div>
  );
}
