// pages/index.tsx
import { useState } from 'react';
import AIChat from '../components/AIChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-purple-500 mb-4">ZapNest AI</h1>
        <p className="text-gray-300">Your AI-powered ecommerce assistant</p>
        <AIChat />
      </main>
    </div>
  );
}
