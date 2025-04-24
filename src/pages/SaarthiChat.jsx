// src/pages/SaarthiChat.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiMic } from "react-icons/fi";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdOutlineLightbulb } from "react-icons/md";

const SaarthiChat = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Saarthi. How can I help you today?", sender: "bot" },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  const GROC_API_KEY = "Bearer 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";

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
    
  }, [messages]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fetchGroqResponse = async (userInput) => {
    const keywords = ["summarize", "today", "summary", "report", "reports"];
    const isSummaryQuery = keywords.some((word) =>
      userInput.toLowerCase().includes(word)
    );

    if (isSummaryQuery) {
      try {
        const res = await fetch("http://localhost:5000/api/today-summary");
        const data = await res.json();
  
        return `
📊 Live Dashboard Summary (${data.date}):
🔌 Electricity: ${data.electricity}
🚿 Water: ${data.water}
🏗️ Infrastructure: ${data.infrastructure}
🏥 Health: ${data.health}
`;
      } catch (err) {
        console.error("Error fetching summary:", err);
        return "⚠️ Couldn't fetch live summary. Please try again later.";
      }
    }

    // 👇 Make sure this is inside the async function
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer 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`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: userInput }],
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
        }),
      });
  
      const data = await response.json();
      return data.choices?.[0]?.message?.content || "🤖 No response from Groq.";
    } catch (error) {
      console.error("Error from Groq API:", error);
      return "❌ Groq error. Please try again.";
    }
  };


  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    const reply = await fetchGroqResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    }, 500);
  };

  const cannedResponses = {
    "fun fact": "🇮🇳 India has the world’s largest postal network with over 1.5 lakh post offices!",
    "motivate me": "🌟 You’re doing amazing. Every line of code you write brings change!",
    "who are you": "I’m Saarthi – your AI assistant to help you report issues, understand government schemes, and guide you.",
    "pm yojana": "🛡️ *PM Suraksha Bima Yojana*: An accident insurance scheme offering coverage up to ₹2 lakhs for just ₹12/year!",
    "tell me a joke": "😂 Why did the function return early? Because it had no class!",
  };
  const checkCannedResponses = (userInput) => {
    for (let key in cannedResponses) {
      if (userInput.toLowerCase().includes(key)) {
        return cannedResponses[key];
      }
    }
  }
  

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-IN";
    setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      recognitionRef.current.stop();
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    recognitionRef.current.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      const cannedResponse = checkCannedResponses(transcript);
      if (cannedResponse) {
        setMessages((prev) => [...prev, { text: transcript, sender: "user" }, { text: cannedResponse, sender: "bot" }]);
      }
      recognitionRef.current.stop();
    };

    recognitionRef.current.start();
  };

  return (
    <div className={`min-h-screen px-4 py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <GiArtificialIntelligence className="text-3xl text-blue-500" />
          <h1 className="text-3xl font-bold">Saarthi</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            {darkMode ? <FaRegSun className="text-yellow-400" /> : <FaRegMoon className="text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="space-y-4 max-w-3xl mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-xl px-5 py-4 shadow-md transition-all duration-300 ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto max-w-[80%] text-right"
                : `bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white max-w-[80%] text-left`
            }`}
          >
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}

        {/* Chat End Marker */}
        <div ref={chatRef} className="h-1" />
      </main>

      {/* Static Content */}
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><MdOutlineLightbulb className="text-yellow-400" /> How Saarthi Can Help</h2>
        <p className="text-gray-700 dark:text-gray-300">Saarthi is designed to be your go-to assistant for navigating government services, reporting issues, and staying informed. Here's how it can help:</p>

        {/* Suggestion Prompt */}
        {messages.length <= 1 && (
          <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-2">Try Asking:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>“Summarize today’s reports”</li>
              <li>“What is PM Suraksha Bima Yojana?”</li>
              <li>“How do i submit a report?”</li>
              <li>“Are there electricity issues in Delhi today?”</li>
            </ul>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 items-center max-w-3xl mx-auto mt-8">
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}          
          className="flex-grow p-4 rounded-xl shadow-md border focus:ring-2 focus:outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors duration-300"
        >
          <FiSend className="text-xl" />
        </button>
        <button
          onClick={handleSpeechToText}
          className={`bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 transition-colors duration-300 ${isListening ? "animate-pulse" : ""}`}
          disabled={isListening}
        >
          <FiMic className="text-xl" />
        </button>
      </div>

      <div ref={chatRef} />
    </div>
  );
};

export default SaarthiChat;
