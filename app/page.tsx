"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sealsData, Seal } from "./sealsData";

const SealCard = ({
  seal,
  onClick,
}: {
  seal: Seal;
  onClick: () => void;
}) => {
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

const Modal = ({ seal, onClose }: { seal: Seal; onClose: () => void }) => {
  const [imageError, setImageError] = useState(false);

  const openP5Window = () => {
    // Open a new fullscreen window
    const newWindow = window.open(
      "",
      "_blank",
      `width=${screen.width},height=${screen.height},fullscreen=yes`
    );

    if (newWindow) {
      // Write out the entire HTML, including p5 and your artworkRenderer
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
              .close-button {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: red;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                z-index: 1000;
              }
            </style>
            <!-- Load p5.js first, then our global-mode artworkRenderer.js -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"></script>
            <script src="/lib/artworkRenderer.js"></script>
          </head>
          <body>
            <button class="close-button" onclick="window.close()">Close</button>
          </body>
        </html>
      `);

      // This is critical so the new window finishes loading the scripts
      newWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-64 mb-4">
          {!imageError ? (
            <Image
              src={seal.image}
              alt={seal.name}
              fill
              className="object-cover rounded-lg"
              onError={() => setImageError(true)}
              sizes="(max-width: 1200px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg">
              <p className="text-gray-400">Image not available</p>
            </div>
          )}
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
            HD
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedSeal, setSelectedSeal] = useState<Seal | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 p-4">
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">SEAL OF 100K</h1>
        <p className="opacity-90 mb-4">
          Explore our collection of 100 historical and mythological seals linked
          with Bitcoin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sealsData.map((seal) => (
          <SealCard
            key={seal.id}
            seal={seal}
            onClick={() => setSelectedSeal(seal)}
          />
        ))}
      </div>

      {selectedSeal && (
        <Modal seal={selectedSeal} onClose={() => setSelectedSeal(null)} />
      )}
    </main>
  );
}
