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
      className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative w-full h-48 mb-2">
        <Image
          src={seal.image} // e.g. "/images/seal1.jpg"
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

/** Modal for displaying Seal details and opening HD sketch */
const Modal = ({ seal, onClose }: { seal: Seal; onClose: () => void }) => {
  console.log('Rendering Modal for:', seal.name);

  const openP5Window = () => {
    console.log('Opening HD Artwork window for:', seal.name);
    const newWindow = window.open('', '_blank', 'width=windowWidth,height=windowHeight');
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
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-64 mb-4">
          <Image
            src={seal.image}
            alt={seal.name}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 1200px) 100vw, 50vw"
          />
        </div>
        <h3 className="text-2xl font-black mb-2 text-white">{seal.name}</h3>
        <p className="text-gray-300 mb-4">
          <strong>Origin:</strong> {seal.origin}
        </p>
        <div className="mb-4">
          <h4 className="font-black mb-2 text-white">History</h4>
          <p className="text-gray-300">{seal.history}</p>
        </div>
        <div className="mb-6">
          <h4 className="font-black mb-2 text-white">Importance</h4>
          <p className="text-gray-300">{seal.importance}</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Close
          </button>
          <button
            onClick={openP5Window}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
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
  console.log('Rendering Home component');

  const openStrategicReserve = () => {
    console.log('Opening Strategic Reserve modal');
    const newWindow = window.open(
      '',
      '_blank',
      'width=400,height=200,top=100,left=100'
    );
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
                background: url('/images/seal-background.jpg') center/cover no-repeat;
                filter: blur(4px);
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
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 p-4">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">SEAL OF 100K</h1>
        <p className="opacity-90 mb-4">
          Explore our collection of 100 historical and mythological seals linked with Bitcoin.
        </p>
      </div>

      <div className="relative flex flex-col items-end mb-8">
        <button
          onClick={openStrategicReserve}
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-bold hover:shadow-lg transition-shadow animate-pulse"
        >
          STRATEGIC RESERVE
        </button>

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
            />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sealsData.map((seal) => {
          console.log('Rendering Seal:', seal.name);
          return (
            <SealCard key={seal.id} seal={seal} onClick={() => setSelectedSeal(seal)} />
          );
        })}
      </div>

      {selectedSeal && <Modal seal={selectedSeal} onClose={() => setSelectedSeal(null)} />}
    </main>
  );
}
