import React, { useState } from 'react';

function App() {
  const [gameLoaded, setGameLoaded] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const romData = event.target.result;
      setGameLoaded(true);

      // CONFIGURACIÓN LOCAL
      window.EJS_player = '#game';
      window.EJS_core = 'gba'; 
      window.EJS_gameUrl = romData; 
      
      // ESTA RUTA ES LA CLAVE: apunta a tu carpeta public
      window.EJS_pathtodata = '/emu/data/'; 
      
      if (window.EJS_init) {
        window.EJS_init();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#00e676', padding: '20px', fontFamily: 'monospace' }}>
      <header style={{ borderBottom: '2px solid #00e676', marginBottom: '40px', paddingBottom: '10px' }}>
        <h1>[ HARDWARE-LAB :: GBA-EMU ]</h1>
      </header>

      {!gameLoaded ? (
        <div style={{ border: '1px solid #00e676', padding: '60px', display: 'inline-block', background: '#1a1a1a' }}>
          <p>> SYSTEM READY...</p>
          <p>> INSERT CARTRIDGE (.GBA)</p>
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleFile} 
            style={{ marginTop: '20px', color: '#00e676' }} 
          />
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
          <div id="game" style={{ width: '100%', height: '600px', border: '4px solid #333' }}></div>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: '20px', padding: '10px 30px', background: '#00e676', color: 'black', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            TERMINAR SESIÓN
          </button>
        </div>
      )}
    </div>
  );
}

export default App;