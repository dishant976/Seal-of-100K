'use client';

export default function StrategicReserve() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center">
      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: "url('/images/seal-background.jpg')" }}
      ></div>

      {/* Coming Soon Text */}
      <div className="relative z-10 text-center">
        <h1
          className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 animate-text-shadow"
        >
          COMING SOON...
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Stay tuned for updates on the Strategic Reserve.
        </p>
      </div>

      <style jsx>{`
        @keyframes text-shadow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 165, 0, 0.6);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 165, 0, 0.8);
          }
        }

        .animate-text-shadow {
          animation: text-shadow 2s infinite;
        }
      `}</style>
    </main>
  );
}
