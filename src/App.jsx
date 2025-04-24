// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/report";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar";
import ChatEntryPage from "./ChatEntryPage";
import SaarthiChat from "./pages/SaarthiChat.jsx";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white font-sans text-gray-800 ">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10 ">
        <Routes>
  <Route path="/" element={<Home />} exact />
  <Route path="/report" element={<Report />} exact />
  <Route path="/dashboard" element={<Dashboard />} exact />
  <Route path="/chat" element={<ChatEntryPage />} exact />
  <Route path="/saarthi" element={<SaarthiChat />} exact />
</Routes>

        </main>
      </div>
    </Router>
  );
}
