// src/ChatEntryPage.jsx
import { Link } from "react-router-dom";

function ChatEntryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Saarthi 🤖</h1>
      <p className="text-lg text-gray-600 mb-6">Your voice-first AI buddy, built with Groq</p>
      <Link to="/saarthi">
        <button className="px-6 py-3 text-white text-lg bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition-all">
          Talk to Saarthi
        </button>
      </Link>
    </div>
  );
}

export default ChatEntryPage;
