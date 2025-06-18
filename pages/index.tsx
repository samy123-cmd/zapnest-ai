// pages/index.tsx
import AIChat from '../components/AIChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-purple-500 mb-6">ZapNest AI</h1>
        <p className="text-xl text-gray-300 mb-8">
          Your AI-powered ecommerce assistant
        </p>
        <AIChat />
      </div>
    </main>
  );
}
