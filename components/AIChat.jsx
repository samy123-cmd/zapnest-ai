import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm your AI assistant. We'll connect to real AI soon!"
      }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${
              msg.role === 'user' ? 'bg-purple-600' : 'bg-gray-700'
            }`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-700 text-white px-3 py-2 rounded"
          placeholder="Type your message..."
        />
      </form>
    </div>
  );
}
