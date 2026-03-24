import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');

  useEffect(() => {
    const initEmulator = async () => {
      if (emulator) return;

      try {
        // Importación dinámica para manejar el archivo como módulo ES
        const { default: mGBAFunc } = await import('/wasm/mgba.js');

        if (canvasRef.current) {
          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            locateFile: (path) => `/wasm/${path}`
          });

          if (Module.FSInit) await Module.FSInit();

          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM.');
          console.log("¡mGBA cargado con éxito!");
        }
      } catch (err) {
        console.error("Error al cargar el módulo WASM:", err);
        setStatus('Error: No se pudo cargar el motor.');
      }
    };

    initEmulator();
  }, [emulator]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !emulator) return;

    setStatus(`Cargando ${file.name}...`);
    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      const gameFolder = '/data/games';
      try { emulator.FS.mkdirTree(gameFolder); } catch (e) { /* Ya existe */ }

      const filePath = `${gameFolder}/${file.name}`;
      emulator.FS.writeFile(filePath, uint8Array);
      
      if (emulator.loadGame(filePath)) {
        setStatus(`Jugando: ${file.name}`);
        canvasRef.current.focus();
      } else {
        setStatus('Error: ROM no compatible.');
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus('Error al leer el archivo.');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00e676' }}>GBA Web Emulator</h1>
      
      <div style={{ padding: '10px 20px', background: emulator ? '#2e7d32' : '#d32f2f', marginBottom: '20px', borderRadius: '5px' }}>
        {status}
      </div>

      <canvas 
        ref={canvasRef} 
        tabIndex="0" 
        style={{ width: '480px', height: '320px', backgroundColor: '#000', border: '5px solid #333', imageRendering: 'pixelated' }} 
      />

      <div style={{ marginTop: '20px' }}>
        {/* LÍNEA 73 CORREGIDA AQUÍ */}
        <input 
          type="file" 
          accept=".gba" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          id="rom-upload" 
        />
        
        <label 
          htmlFor="rom-upload" 
          style={{ padding: '10px 20px', background: '#3f51b5', cursor: 'pointer', borderRadius: '5px' }}
        >
          {emulator ? '📁 Cargar Juego' : 'Iniciando...'}
        </label>
      </div>
    </div>
  );
}

export default App;