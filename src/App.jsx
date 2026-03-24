import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Esperando motor...');

  useEffect(() => {
    const initEmulator = async () => {
      // Si ya está inicializado, no hacer nada
      if (emulator) return;

      // Accedemos a la función que cargó el index.html en el objeto global
      const mGBAFunc = window.mGBA;

      if (!mGBAFunc) {
        // Si el script aún no carga, esperamos 500ms y reintentamos
        console.log("Esperando a que mgba.js esté disponible en window...");
        setTimeout(initEmulator, 500);
        return;
      }

      try {
        if (canvasRef.current) {
          // Inicializamos el módulo usando la función global
          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            // IMPORTANTE: Ruta absoluta para que Vercel encuentre el .wasm
            locateFile: (path) => `/wasm/${path}`
          });

          // Inicializar el sistema de archivos virtual de mGBA
          if (Module.FSInit) {
            await Module.FSInit();
          }

          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM (.gba)');
          console.log("¡mGBA cargado con éxito!");
        }
      } catch (err) {
        console.error("Error crítico al iniciar el motor:", err);
        setStatus('Error: El motor no pudo iniciar.');
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
      
      // Crear carpeta para los juegos si no existe
      const gameFolder = '/data/games';
      try {
        emulator.FS.mkdirTree(gameFolder);
      } catch (err) {
        // La carpeta probablemente ya existe
      }

      const filePath = `${gameFolder}/${file.name}`;
      
      // Escribir el archivo en el sistema virtual
      emulator.FS.writeFile(filePath, uint8Array);
      
      // Cargar el juego
      if (emulator.loadGame(filePath)) {
        setStatus(`Jugando: ${file.name}`);
        // Dar foco al canvas para que detecte el teclado
        canvasRef.current.focus();
      } else {
        setStatus('Error: ROM no válida o incompatible.');
      }
    } catch (err) {
      console.error("Error al procesar la ROM:", err);
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
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ color: '#00e676', marginBottom: '10px' }}>GBA Web Emulator</h1>
      
      <div style={{ 
        padding: '10px 20px', 
        background: emulator ? '#2e7d32' : '#d32f2f', 
        marginBottom: '20px', 
        borderRadius: '5px',
        fontWeight: 'bold'
      }}>
        {status}
      </div>

      <canvas 
        ref={canvasRef} 
        tabIndex="0" 
        style={{ 
          width: '480px', 
          height: '320px', 
          backgroundColor: '#000', 
          border: '5px solid #333',
          imageRendering: 'pixelated', // Para que no se vea borroso
          outline: 'none'
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
            background: '#3f51b5', 
            color: 'white',
            cursor: 'pointer', 
            borderRadius: '5px',
            fontSize: '1rem',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#303f9f'}
          onMouseOut={(e) => e.target.style.background = '#3f51b5'}
        >
          {emulator ? '📂 Seleccionar ROM' : 'Cargando...'}
        </label>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#888' }}>
        Usa el teclado para jugar después de cargar la ROM.
      </div>
    </div>
  );
}

export default App;