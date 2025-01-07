'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sealsData } from './sealsData';
import type { Seal } from './sealsData';

/** Card for each Seal */
const SealCard = ({ seal, onClick }: { seal: Seal; onClick: () => void }) => {
  console.log('Rendering SealCard for:', seal.name);

  return (
    <div
      onClick={onClick}
      className="bg-black/80 rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative w-full h-48 mb-2">
        <Image
          src={seal.image}
          alt={seal.name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h2 className="font-bold text-lg truncate text-white">{seal.name}</h2>
      <p className="text-gray-300 text-sm line-clamp-2">{seal.importance}</p>
    </div>
  );
};

/** Modal for displaying Seal details */
const Modal = ({ seal, onClose }: { seal: Seal; onClose: () => void }) => {
  console.log('Rendering Modal for:', seal.name);

  const openP5Window = () => {
    console.log('Opening HD Artwork window for:', seal.name);
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <title>HD Artwork</title>
          <style>
            body {
              margin: 0;
              overflow: hidden;
              background-color: black;
            }
          </style>
          <script src="/lib/p5.js"></script>
          <script src="/lib/artworkRenderer${seal.id}.js"></script>
        </head>
        <body></body>
        </html>
      `);
      newWindow.document.close();
    } else {
      console.error('Failed to open new window for HD Artwork');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg p-6 max-w-2xl w-full">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={seal.image}
            alt={seal.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <h3 className="text-2xl font-black mb-2 text-white">{seal.name}</h3>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Close
          </button>
          <button onClick={openP5Window} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            View HD
          </button>
        </div>
      </div>
    </div>
  );
};

/** Main Home Page */
export default function Home() {
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  const openStrategicReserve = () => {
    console.log('Opening Strategic Reserve modal');
    const newWindow = window.open('', '_blank', 'width=400,height=200');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>Strategic Reserve</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: black;
                color: white;
              }
            </style>
          </head>
          <body>
            <h1>COMING SOON...</h1>
          </body>
        </html>
      `);
    } else {
      console.error('Failed to open new window for Strategic Reserve');
    }
  };

  return (
    <main className="min-h-screen bg-orange-100 p-4">
      <div className="bg-orange-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">SEAL OF 100K</h1>
        <p className="opacity-90 mb-4">
          Explore our collection of 100 historical and mythological seals linked with Bitcoin.
        </p>
      </div>

      <div className="flex flex-col items-end mb-8">
        <button
          onClick={openStrategicReserve}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-bold hover:shadow-lg"
        >
          STRATEGIC RESERVE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sealsData.map((seal) => (
          <SealCard key={seal.id} seal={seal} onClick={() => setSelectedSeal(seal)} />
        ))}
      </div>

      {selectedSeal && <Modal seal={selectedSeal} onClose={() => setSelectedSeal(null)} />}
    </main>
  );
}
