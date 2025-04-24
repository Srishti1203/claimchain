import React, { useState, useEffect, useRef } from "react";

const Report = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Setup Web Speech API
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition(); // eslint-disable-line
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContent((prev) => prev + " " + transcript);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const report = {
      category,
      type,
      content,
      timestamp: new Date().toISOString(),
    };

    const savedReports = JSON.parse(localStorage.getItem("claimReports") || "[]");
    savedReports.push(report);
    localStorage.setItem("claimReports", JSON.stringify(savedReports));

    setCategory("");
    setType("");
    setContent("");

    alert("✅ Report submitted!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl mt-6 border border-blue-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        📝 Submit a Report
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">🔽 Select Category</option>
          <option value="Water">💧 Water</option>
          <option value="Electricity">⚡ Electricity</option>
          <option value="Roads">🛣️ Roads</option>
          <option value="Other">📝 Other</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
        >
          <option value="">🔽 Select Type</option>
          <option value="Complaint">❗ Complaint</option>
          <option value="Suggestion">💡 Suggestion</option>
          <option value="Feedback">💬 Feedback</option>
        </select>

        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="🗣️ Describe your report..."
            required
            className="w-full border border-gray-300 p-4 rounded-lg shadow-sm h-32 focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <button
            type="button"
            onClick={startListening}
            className={`absolute right-3 bottom-3 text-sm px-3 py-1 rounded-lg shadow ${
              isListening
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            🎤 {isListening ? "Listening..." : "Voice Input"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-blue-700 transition"
        >
          📤 Submit Report
        </button>
      </form>
    </div>
  );
};

export default Report;
