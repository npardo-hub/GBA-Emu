import React, { useRef, useEffect } from 'react';
import Library from './components/Library';
import EmulatorCanvas from './components/EmulatorCanvas';

function App() {
  const workerRef = useRef(null);

  useEffect(() => {
    // Creamos el worker al cargar la app
    workerRef.current = new Worker('/wasm/emulatorWorker.js');
    
    workerRef.current.postMessage({ type: 'START' });

    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'READY') console.log("Emulador Online");
    };
  }, []);

  const handleGameSelect = (romBuffer) => {
    workerRef.current.postMessage({ 
      type: 'LOAD_ROM', 
      payload: { buffer: romBuffer } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-green-500 mb-6 font-mono">VBA_WEB.EXE</h1>
      <div className="flex gap-8 w-full max-w-6xl">
        <Library onSelectGame={handleGameSelect} />
        <div className="flex-1">
          <EmulatorCanvas />
          {/* Aquí irían los Controles más abajo */}
        </div>
      </div>
    </div>
  );
}