import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Iniciando motor...');

 useEffect(() => {
    const initEmulator = async () => {
      if (emulator) return;

      try {
        // Intentamos importar el archivo como un módulo real. 
        // Esto le dice al navegador: "Oye, esto tiene import.meta, léelo bien".
        const mGBAModule = await import('/wasm/mgba.js');
        const mGBAFunc = mGBAModule.default;

        if (canvasRef.current && mGBAFunc) {
          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            // Esta línea asegura que el .wasm se busque en la raíz /wasm/
            locateFile: (path) => `/wasm/${path}`
          });

          if (Module.FSInit) await Module.FSInit();

          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM.');
          console.log("¡Éxito! Motor mGBA iniciado.");
        }
      } catch (err) {
        console.error("Error cargando el motor:", err);
        setStatus('Error: Revisa la consola (F12).');
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
      try { emulator.FS.mkdirTree(gameFolder); } catch (e) {}

      const filePath = `${gameFolder}/${file.name}`;
      emulator.FS.writeFile(filePath, uint8Array);
      
      if (emulator.loadGame(filePath)) {
        setStatus(`Jugando: ${file.name}`);
        canvasRef.current.focus();
      } else {
        setStatus('Error: El archivo no es una ROM válida.');
      }
    } catch (err) {
      console.error("Error al leer archivo:", err);
      setStatus('Error al procesar la ROM.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ color: '#00e676', fontFamily: '"Press Start 2P", cursive', fontSize: '1.2rem' }}>
        GBA WEB PLAYER
      </h1>
      
      <div style={{ 
        margin: '20px 0', 
        padding: '10px', 
        background: emulator ? '#2e7d32' : '#c62828', 
        borderRadius: '4px' 
      }}>
        {status}
      </div>

      <canvas ref={canvasRef} tabIndex="0" style={{ width: '480px', height: '320px' }} />

      <div style={{ marginTop: '20px' }}>
        <input 
          type="file" 
          accept=".gba" 
          onChange={handleFileChange} 
          id="upload" 
          style={{ display: 'none' }} 
        />
        <label 
          htmlFor="upload" 
          style={{ 
            padding: '10px 20px', 
            background: '#3f51b5', 
            cursor: 'pointer', 
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          {emulator ? '📂 Cargar ROM' : 'Cargando...'}
        </label>
      </div>
    </div>
  );
}

export default App;