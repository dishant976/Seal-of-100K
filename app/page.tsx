'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sealsData } from './sealsData';
import type { Seal } from './sealsData';

const SealCard = ({ seal, onClick }: { seal: Seal; onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative w-full h-48 mb-2">
        {!imageError ? (
          <Image
            src={seal.image}
            alt={seal.name}
            fill
            className="object-cover rounded-lg"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
            <p className="text-gray-400">Image not available</p>
          </div>
        )}
      </div>
      <h2 className="font-bold text-lg truncate text-white">{seal.name}</h2>
      <p className="text-gray-300 text-sm line-clamp-2">{seal.importance}</p>
    </div>
  );
};

export default function Home() {
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 p-4">
      {/* Top Button for Strategic Reserve */}
      <div className="relative flex flex-col items-end">
        <button
          onClick={() => (window.location.href = '/strategic-reserve')}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-bold hover:shadow-lg transition-shadow animate-pulse"
        >
          STRATEGIC RESERVE
        </button>

        {/* Links Below Strategic Reserve */}
        <div className="flex space-x-4 mt-4">
          <a
            href="https://magiceden.io/ordinals/marketplace/s100k"
            target="_blank"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src="/icons/magic-eden.png"
              alt="Magic Eden"
              width={50}
              height={50}
              className="rounded-full"
            />
          </a>
          <a
            href="https://ordinalsbot.com/mint/sealof100k"
            target="_blank"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src="/icons/ordinalsbot.png"
              alt="Ordinals Bot"
              width={50}
              height={50}
              className="rounded-full"
            />
          </a>
          <a
            href="https://discord.gg/WeWeDetxBJ"
            target="_blank"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src="/icons/discord.png"
              alt="Discord"
              width={50}
              height={50}
              className="rounded-full"
            />
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">SEAL OF 100K</h1>
        <p className="opacity-90 mb-4">
          Seal of 100K connecting Art, Mythology and Bitcoin by generating an artwork using recursion symbolising humanity&apos;s greatest achievement in Age of Aquarius.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sealsData.map((seal) => (
          <SealCard key={seal.id} seal={seal} onClick={() => setSelectedSeal(seal)} />
        ))}
      </div>

      {/* Modal for Selected Seal */}
      {selectedSeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <button
              onClick={() => setSelectedSeal(null)}
              className="absolute top-4 right-4 px-2 py-1 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedSeal.name}</h2>
            <p className="text-gray-700 mb-4">{selectedSeal.importance}</p>
            <Image
              src={selectedSeal.image}
              alt={selectedSeal.name}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="mt-8 p-4 text-center bg-black text-white rounded-lg">
        <div className="text-sm opacity-80">&copy; Seal of 100K</div>
      </footer>
    </main>
  );
}
