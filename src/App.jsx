import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');
 const mGBAFunc = window.mGBA; // Usamos la función global

if (mGBAFunc) {
  const Module = await mGBAFunc({
    canvas: canvasRef.current,
    locateFile: (path) => `/wasm/${path}`
  });
  // ... resto del código
}
useEffect(() => {
  const initEmulator = async () => {
    if (canvasRef.current) {
      try {
        // Usamos la función que el script cargó en el navegador
        // 'mGBA' debería estar disponible globalmente
        const mGBAFunc = window.mGBA; 

        if (!mGBAFunc) {
          throw new Error("El motor mGBA no se ha cargado desde el script.");
        }

        const Module = await mGBAFunc({
          canvas: canvasRef.current,
          locateFile: (path) => `/wasm/${path}`
        });

        await Module.FSInit();
        setEmulator(Module);
        setStatus('Motor listo. Selecciona una ROM.');
      } catch (err) {
        console.error(err);
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
      
      // Guardar en el sistema de archivos virtual de mGBA
      const path = `/data/games/${file.name}`;
      emulator.FS.writeFile(path, uint8Array);
      
      // Ejecutar el juego
      if (emulator.loadGame(path)) {
        setStatus(`Jugando: ${file.name}`);
      } else {
        setStatus('Error: No se pudo cargar la ROM.');
      }
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
      setStatus('Error al leer el archivo seleccionado.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#121212', 
      color: '#e0e0e0', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px' 
    }}>
      <h1 style={{ marginBottom: '10px' }}>GBA Web Emulator</h1>
      
      <div style={{ 
        padding: '8px 15px', 
        borderRadius: '20px', 
        backgroundColor: emulator ? '#2e7d32' : '#d32f2f', 
        color: 'white',
        fontSize: '14px',
        marginBottom: '20px'
      }}>
        {status}
      </div>

      <div style={{ 
        border: '12px solid #333', 
        borderRadius: '15px', 
        backgroundColor: '#000', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        lineHeight: 0 
      }}>
        <canvas 
          ref={canvasRef} 
          width="240" 
          height="160" 
          style={{ 
            width: '480px', 
            height: '320px', 
            imageRendering: 'pixelated',
            display: 'block'
          }}
        />
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <label style={{
          padding: '12px 24px',
          backgroundColor: '#3f51b5',
          color: 'white',
          borderRadius: '5px',
          cursor: emulator ? 'pointer' : 'not-allowed',
          opacity: emulator ? 1 : 0.6,
          transition: 'background 0.3s'
        }}>
          {emulator ? '📂 Seleccionar Juego' : 'Esperando motor...'}
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleFileChange}
            disabled={!emulator}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '15px', 
        backgroundColor: '#1e1e1e', 
        borderRadius: '10px',
        fontSize: '13px',
        color: '#aaa',
        border: '1px solid #333'
      }}>
        <p style={{ margin: '5px 0' }}><strong>Controles:</strong></p>
        <p style={{ margin: '5px 0' }}>D-Pad: Flechas | A: Z | B: X | L: A | R: S</p>
        <p style={{ margin: '5px 0' }}>Start: Enter | Select: Shift</p>
      </div>
    </div>
  );
}

export default App;