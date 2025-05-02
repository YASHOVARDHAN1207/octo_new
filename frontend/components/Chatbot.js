import { useState } from "react";
import { MessageSquare } from "lucide-react"; // make sure lucide-react is installed

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help with your fitness or health today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: "user", text: input }];
      setMessages(newMessages);

      const lowercaseInput = input.toLowerCase();
      let botReply = "Can you be more specific about your health goals?";

      if (lowercaseInput.includes("yoga")) {
        botReply = "🧘‍♂️ Try a 15-minute morning yoga routine like Sun Salutations!";
      } else if (lowercaseInput.includes("exercise")) {
        botReply = "💪 Start with 3 sets of pushups, squats, and jumping jacks.";
      } else if (lowercaseInput.includes("stress")) {
        botReply = "😌 Deep breathing and mindfulness can help with stress. Want a guided breathing session?";
      } else if (lowercaseInput.includes("diet")) {
        botReply = "🥗 Include more fiber, fruits, and hydration. Want a meal suggestion?";
      } else if (lowercaseInput.includes("pain")) {
        botReply = "🩺 Please describe where you're feeling pain. I can suggest some gentle stretches.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setInput("");
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#e3ffa8] p-3 rounded-full shadow-lg cursor-pointer hover:scale-105 transition"
      >
        <MessageSquare className="text-black" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="font-bold text-[#0a0a0b] mb-2">💬 Octo Assistant</div>
          <div className="h-48 overflow-y-auto mb-2 space-y-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md ${
                  msg.sender === "user"
                    ? "bg-[#e3ffa8] text-black text-right"
                    : "bg-[#f3f4f6] text-gray-800 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm"
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-[#0a0a0b] text-white px-3 rounded-r-md text-sm"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
