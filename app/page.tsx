"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sealsData } from "./sealsData";
import type { Seal } from "./sealsData";

/**
 * Card component for each Seal
 */
function SealCard({
  seal,
  onClick,
}: {
  seal: Seal;
  onClick: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 cursor-pointer 
                 hover:shadow-xl transition-shadow flex flex-col items-center"
    >
      <div className="relative w-full h-48 mb-2">
        {!imageError ? (
          <Image
            src={seal.image}
            alt={seal.name}
            fill
            className="object-cover rounded-lg"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
            <p className="text-gray-400">Image not available</p>
          </div>
        )}
      </div>
      <h2 className="font-bold text-lg truncate text-white">{seal.name}</h2>
    </div>
  );
}

/**
 * Modal component that shows more details about the Seal.
 * Also has a button to open a new window with p5.js and the artwork script.
 */
function Modal({
  seal,
  onClose,
}: {
  seal: Seal;
  onClose: () => void;
}) {
  const openP5Window = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (!newWindow) {
      console.error("Failed to open new window.");
      return;
    }

    // Build an HTML document that includes p5.js + your artwork script inline
    newWindow.document.open();
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${seal.name} HD Artwork</title>
          <style>
            body {
              margin: 0;
              overflow: hidden;
              background: black;
            }
            .close-button {
              position: absolute;
              top: 10px;
              right: 10px;
              background-color: red;
              color: white;
              padding: 5px;
              border: none;
              cursor: pointer;
              z-index: 1000;
            }
          </style>
          <!-- Load p5 from the CDN -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
          <!-- Load the specific artwork script for this seal -->
          <script src="${seal.p5CodePath}"></script>
        </head>
        <body>
          <button class="close-button" onclick="window.close()">Close</button>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Optional large image preview */}
        <div className="relative w-full h-64 mb-4">
          <Image
            src={seal.image}
            alt={seal.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <h3 className="text-2xl font-black mb-2 text-white">{seal.name}</h3>

        {/* ORIGIN */}
        <div className="mb-2">
          <h4 className="font-black text-white">Origin</h4>
          <p className="text-gray-300">{seal.origin}</p>
        </div>

        {/* HISTORY (if available) */}
        {seal.history && (
          <div className="mb-2">
            <h4 className="font-black text-white">History</h4>
            <p className="text-gray-300">{seal.history}</p>
          </div>
        )}

        {/* IMPORTANCE */}
        <div className="mb-2">
          <h4 className="font-black text-white">Importance</h4>
          <p className="text-gray-300">{seal.importance}</p>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-4 mt-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Close
          </button>

          {/* HD button only if p5CodePath is defined */}
          {seal.p5CodePath && (
            <button
              onClick={openP5Window}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              HD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  // ----------------------
  // STRATEGIC RESERVE LOGIC
  // ----------------------
 const openStrategicReserve = () => {
  const newWindow = window.open("", "_blank", "width=1000,height=700");
  if (!newWindow) {
    console.error("Failed to open new window.");
    return;
  }

  newWindow.document.open();
  newWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Strategic Reserve</title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        body {
          position: relative;
          overflow: hidden;
          background: url('/images/seal-background.jpg') no-repeat center center fixed;
          background-size: cover;

        }
        .coming-soon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: gold;
          font-size: 80px;
          font-weight: bold;
          text-align: center;
          animation: blink 1s infinite;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.8),
                       0 0 20px rgba(255, 215, 0, 0.6);
        }
        @keyframes blink {
          0%   { opacity: 1; }
          50%  { opacity: 0; }
          100% { opacity: 1; }
        }
      </style>
    </head>
    <body>
      <div class="coming-soon">COMING SOON.....</div>
    </body>
    </html>
  `);
  newWindow.document.close();
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 p-4">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-lg mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left side: Main Title */}
        <div>
          <h1 className="text-4xl font-bold mb-2">SEAL OF 100K</h1>
          <p>Discover historical seals with HD artwork!</p>
        </div>

        {/* Right side: Buttons/Icons */}
        <div className="mt-4 md:mt-0 flex flex-col items-end gap-4">
          {/* STRATEGIC RESERVE Button */}
          <button
            onClick={openStrategicReserve}
            className="px-4 py-2 rounded-lg text-yellow-300 font-extrabold text-lg 
                       animate-pulse 
                       hover:scale-105 transition-transform
                       bg-gradient-to-r from-yellow-500 to-yellow-700 
                       bg-clip-text text-transparent 
                       shadow-md hover:shadow-lg"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            STRATEGIC RESERVE
          </button>

          {/* Icons */}
          <div className="flex gap-4">
            {/* Magic Eden */}
            <a
              href="https://magiceden.io/ordinals/marketplace/s100k"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/magic-eden.png"
                alt="Magic Eden"
                width={32}
                height={32}
                className="hover:scale-105 transition-transform"
              />
            </a>

            {/* Ordinals Bot */}
            <a
              href="https://ordinalsbot.com/mint/sealof100k"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/ordinalsbot.png"
                alt="Ordinals Bot"
                width={32}
                height={32}
                className="hover:scale-105 transition-transform"
              />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/WeWeDetxBJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/discord.png"
                alt="Discord"
                width={32}
                height={32}
                className="hover:scale-105 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Grid of Seal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sealsData.map((seal) => (
          <SealCard
            key={seal.id}
            seal={seal}
            onClick={() => setSelectedSeal(seal)}
          />
        ))}
      </div>

      {/* Modal for the selected seal */}
      {selectedSeal && (
        <Modal seal={selectedSeal} onClose={() => setSelectedSeal(null)} />
      )}
    </main>
  );
}
