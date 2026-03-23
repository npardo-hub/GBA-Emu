import React, { useEffect, useRef, useState } from 'react';
import mGBA from '@thenick775/mgba-wasm';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');

useEffect(() => {
  const initEmulator = async () => {
    if (canvasRef.current) {
      try {
        // Carga dinámica para que Vite no se trabe en el build
        const { default: mGBA } = await import('@thenick775/mgba-wasm');

        const Module = await mGBA({
          canvas: canvasRef.current,
          locateFile: (path) => `/wasm/${path}`
        });

        await Module.FSInit();
        setEmulator(Module);
        setStatus('Motor listo. Selecciona una ROM.');
      } catch (err) {
        console.error(err);
        setStatus('Error al cargar el motor.');
      }
    }
  };
  initEmulator();
}, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !emulator) return;

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    
    // Guardar en el sistema de archivos virtual de mGBA
    const path = `/data/games/${file.name}`;
    emulator.FS.writeFile(path, uint8Array);
    
    // Cargar el juego
    if (emulator.loadGame(path)) {
      setStatus(`Jugando: ${file.name}`);
    } else {
      setStatus('Error al cargar la ROM.');
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1>GBA Web Emulator</h1>
      <p style={{ color: emulator ? '#4caf50' : '#ff9800' }}>{status}</p>

      <div style={{ border: '10px solid #333', borderRadius: '10px', backgroundColor: '#000', marginBottom: '20px' }}>
        <canvas 
          ref={canvasRef} 
          width="240" 
          height="160" 
          style={{ width: '480px', height: '320px', imageRendering: 'pixelated' }}
        />
      </div>

      <input 
        type="file" 
        accept=".gba" 
        onChange={handleFileChange}
        style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      />

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#888' }}>
        <p>Controles: Flechas (D-Pad), Z (A), X (B), Enter (Start), Shift (Select)</p>
      </div>
    </div>
  );
}

export default App;