// components/AIChat.tsx
'use client';
import { useState } from 'react';

export default function AIChat() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });
      const aiMessage = await response.json();
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error connecting to AI'
      }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-gray-800 rounded-lg shadow-xl border border-purple-500/30">
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${
              msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left animate-pulse">
            <div className="inline-block px-4 py-2 rounded-lg bg-gray-700 text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded focus:ring-2 focus:ring-purple-500"
          placeholder="Ask about products..."
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
