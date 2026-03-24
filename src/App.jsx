import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');

  useEffect(() => {
    const initEmulator = async () => {
      // Si ya tenemos el emulador, no reintentamos
      if (emulator) return;

      if (canvasRef.current) {
        try {
          // 1. Verificamos si mGBA existe en el objeto global (cargado por index.html)
          const mGBAFunc = window.mGBA;

          if (!mGBAFunc) {
            console.log("Esperando script de mgba.js...");
            setTimeout(initEmulator, 1000); // Reintento con un poco más de margen
            return;
          }

          // 2. Inicializamos el módulo apuntando a la raíz del despliegue
          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            // Forzamos la ruta absoluta para evitar errores en subdirectorios de Vercel
            locateFile: (path) => {
              const fullPath = `/wasm/${path}`;
              console.log("Cargando recurso WASM:", fullPath);
              return fullPath;
            }
          });

          // 3. Inicializar el Sistema de Archivos Virtual
          if (Module.FSInit) {
            await Module.FSInit();
          }

          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM.');
          console.log("¡Motor mGBA cargado con éxito!");

        } catch (err) {
          console.error("Error crítico al iniciar el motor:", err);
          setStatus('Error: El motor no respondió.');
        }
      }
    };

    initEmulator();
  }, [emulator]); // Se ejecuta al montar o si el estado del emulador cambia

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !emulator) return;

    setStatus(`Cargando ${file.name}...`);
    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      
      // Crear carpeta de juegos si no existe
      const gameFolder = '/data/games';
      try {
        emulator.FS.mkdirTree(gameFolder);
      } catch (e) {
        // La carpeta ya podría existir
      }

      const filePath = `${gameFolder}/${file.name}`;
      emulator.FS.writeFile(filePath, uint8Array);
      
      // Intentar cargar el juego
      if (emulator.loadGame(filePath)) {
        setStatus(`Jugando: ${file.name}`);
        // Enfocar el canvas para que los controles funcionen de inmediato
        canvasRef.current.focus();
      } else {
        setStatus('Error: No se pudo cargar la ROM.');
      }
    } catch (err) {
      console.error("Error al procesar el archivo:", err);
      setStatus('Error al leer el archivo.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#121212', 
      color: '#fff', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ color: '#00e676', marginBottom: '10px' }}>GBA Web Emulator</h1>
      
      <div style={{ 
        padding: '10px 20px', 
        background: emulator ? '#2e7d32' : '#d32f2f', 
        marginBottom: '20px', 
        borderRadius: '5px',
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
      }}>
        {status}
      </div>

      <canvas 
        ref={canvasRef} 
        tabIndex="0" // Permite capturar eventos de teclado
        style={{ 
          width: '480px', 
          height: '320px', 
          backgroundColor: '#000', 
          border: '5px solid #333',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
          imageRendering: 'pixelated'
        }} 
      />

      <div style={{ marginTop: '30px' }}>
        <input 
          type="file" 
          accept=".gba" 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          id="rom-upload" 
        />
        <label 
          htmlFor="rom-upload" 
          style={{ 
            padding: '12px 24px', 
            background: emulator ? '#3f51b5' : '#555', 
            cursor: emulator ? 'pointer' : 'not-allowed', 
            borderRadius: '5px',
            fontSize: '1.1rem',
            transition: 'background 0.2s'
          }}>
          {emulator ? '📁 Seleccionar ROM' : 'Iniciando Motor...'}
        </label>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#888' }}>
        Asegúrate de tener los archivos en /public/wasm/
      </div>
    </div>
  );
}

export default App;