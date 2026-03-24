import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');

  useEffect(() => {
    const initEmulator = async () => {
      if (canvasRef.current) {
        try {
          // Accedemos directamente a la función global cargada por el index.html
          const mGBAFunc = window.mGBA;

          if (!mGBAFunc) {
            // Si el script tarda un poco, reintentamos en medio segundo
            setTimeout(initEmulator, 500);
            return;
          }

          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            // IMPORTANTE: Sin la palabra 'public', directo a /wasm/
            locateFile: (path) => `/wasm/${path}` 
          });

          await Module.FSInit();
          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM.');
        } catch (err) {
          console.error("Error al iniciar el motor:", err);
          setStatus('Error: El motor no respondió.');
        }
      }
    };
    initEmulator();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !emulator) return;

    setStatus(`Cargando ${file.name}...`);
    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      const path = `/data/games/${file.name}`;
      
      emulator.FS.writeFile(path, uint8Array);
      
      if (emulator.loadGame(path)) {
        setStatus(`Jugando: ${file.name}`);
      } else {
        setStatus('Error: No se pudo cargar la ROM.');
      }
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
      setStatus('Error al leer el archivo.');
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1>GBA Web Emulator</h1>
      <div style={{ padding: '10px', background: emulator ? '#2e7d32' : '#d32f2f', marginBottom: '20px', borderRadius: '5px' }}>
        {status}
      </div>
      <canvas ref={canvasRef} style={{ width: '480px', height: '320px', backgroundColor: '#000', border: '5px solid #333' }} />
      <div style={{ marginTop: '20px' }}>
        <input type="file" accept=".gba" onChange={handleFileChange} style={{ display: 'none' }} id="rom-upload" />
        <label htmlFor="rom-upload" style={{ padding: '10px 20px', background: '#3f51b5', cursor: 'pointer', borderRadius: '5px' }}>
          {emulator ? 'Cargar ROM' : 'Iniciando...'}
        </label>
      </div>
    </div>
  );
}

export default App;