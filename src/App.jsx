import React, { useEffect, useRef, useState } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [emulator, setEmulator] = useState(null);
  const [status, setStatus] = useState('Cargando motor...');

  useEffect(() => {
    const initEmulator = async () => {
      // Esperamos a que el script de mGBA esté cargado en el window
      if (canvasRef.current) {
        try {
          // Buscamos la función global que cargó el script del index.html
          const mGBAFunc = window.mGBA;

          if (!mGBAFunc) {
            // Si el script aún no carga, esperamos un poco
            setTimeout(initEmulator, 500);
            return;
          }

          const Module = await mGBAFunc({
            canvas: canvasRef.current,
            // Importante: apunta a donde están tus archivos físicos en public/wasm/
            locateFile: (path) => `/wasm/${path}`
          });

          await Module.FSInit();
          setEmulator(Module);
          setStatus('Motor listo. Selecciona una ROM (.gba)');
        } catch (err) {
          console.error("Error al inicializar mGBA:", err);
          setStatus('Error: El motor no respondió.');
        }
      }
    };
    initEmulator();
  }, []);

 const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // Si no hay archivo o el motor no ha cargado, no hacemos nada
    if (!file || !emulator) return;

    setStatus(`Cargando ${file.name}...`);

    try {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);
      
      // Creamos la ruta dentro del sistema de archivos virtual del emulador
      const path = `/data/games/${file.name}`;
      
      // Escribimos el archivo en la memoria del emulador
      emulator.FS.writeFile(path, uint8Array);
      
      // Intentamos cargar el juego
      if (emulator.loadGame(path)) {
        setStatus(`Jugando: ${file.name}`);
      } else {
        setStatus('Error: No se pudo cargar la ROM.');
      }
    } catch (err) {
      // Si algo falla en la lectura del archivo, lo mostramos en consola
      console.error("Error al procesar el archivo:", err);
      setStatus('Error al leer el archivo.');
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
      <h1 style={{ marginBottom: '10px', color: '#3f51b5' }}>GBA Web Player</h1>
      
      <div style={{ 
        padding: '8px 20px', 
        borderRadius: '20px', 
        backgroundColor: emulator ? '#2e7d32' : '#d32f2f', 
        color: 'white',
        fontSize: '14px',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        {status}
      </div>

      <div style={{ 
        border: '10px solid #222', 
        borderRadius: '15px', 
        backgroundColor: '#000', 
        boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
        overflow: 'hidden'
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

      <div style={{ marginTop: '30px' }}>
        <label style={{
          padding: '15px 30px',
          backgroundColor: '#3f51b5',
          color: 'white',
          borderRadius: '8px',
          cursor: emulator ? 'pointer' : 'not-allowed',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'transform 0.2s'
        }}>
          {emulator ? '📂 Cargar Juego' : 'Iniciando...'}
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
        padding: '20px', 
        backgroundColor: '#1e1e1e', 
        borderRadius: '10px',
        fontSize: '14px',
        color: '#888',
        border: '1px solid #333',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '5px 0', color: '#ccc' }}><strong>Controles de teclado:</strong></p>
        <p style={{ margin: '5px 0' }}>Cruceta: Flechas | A: Z | B: X</p>
        <p style={{ margin: '5px 0' }}>L: A | R: S | Start: Enter | Select: Shift</p>
      </div>
    </div>
  );
}

export default App;