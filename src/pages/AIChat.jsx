import { useState } from "react";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `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`,
        },
        body: JSON.stringify({
          messages: newMessages,
          model: "mixtral-8x7b-32768",
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;
      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error from Groq API:", error);
    } finally {
      setLoading(false);
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleVoiceInput = () => {
    if (!recognition) return alert("Speech recognition not supported");

    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
  };

  const handleExport = () => {
    const text = messages.map(m => `${m.role === 'user' ? '🧑' : '🤖'}: ${m.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat_log.txt";
    a.click();
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-3 py-2 text-sm bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1 className="text-2xl font-bold mb-4">Saarthi AI Chat 🤖</h1>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-3">
            {msg.role === "assistant" ? <span>🤖</span> : <span className="ml-auto">🧑</span>}
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                msg.role === "user" ? "bg-blue-200 ml-auto" : "bg-green-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-500 italic animate-pulse">AI is typing...</div>}
      </div>

      <div className="flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border px-4 py-2 rounded shadow"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Send
        </button>
        <button
          onClick={handleVoiceInput}
          className="ml-2 px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          🎤 Speak
        </button>
      </div>

      <button
        onClick={handleExport}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        📄 Download Chat
      </button>
    </div>
  );
};

export default AIChat;