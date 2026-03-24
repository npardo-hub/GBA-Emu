import React, { useState } from 'react';

function App() {
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [romUrl, setRomUrl] = useState("");

  // Función para manejar la carga del archivo ROM local
  const handleRomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Creamos una URL temporal para el archivo seleccionado
      const blobUrl = URL.createObjectURL(file);
      // La insertamos como parámetro en la URL de Afterplay
      const finalUrl = `https://afterplay.io/games/gba-emulator?rom=${encodeURIComponent(blobUrl)}`;
      setRomUrl(finalUrl);
      setIsSystemActive(true);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#050505', 
      minHeight: '100vh', 
      color: '#00ffa3', 
      fontFamily: '"Courier New", Courier, monospace',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px'
    }}>
      {/* HEADER ESTILO HARDWARE LAB */}
      <header style={{ width: '100%', maxWidth: '900px', borderBottom: '1px solid #00ffa3', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
          [ HARDWARE_LAB_PREMIUM // CORE_V5 ]
        </h1>
        <p style={{ color: '#888', fontSize: '0.8rem' }}>STATUS: SYSTEM_READY // ENGINE: AFTERPLAY_EXTERNAL</p>
      </header>

      {!isSystemActive ? (
        <div style={{ 
          marginTop: '100px', 
          textAlign: 'center', 
          border: '1px solid #333', 
          padding: '60px',
          background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
          boxShadow: '0 0 20px rgba(0, 255, 163, 0.1)'
        }}>
          <h2 style={{ marginBottom: '30px' }}>INSERT_MEDIA_AND_INITIALIZE</h2>
          
          {/* Input de archivo oculto */}
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleRomUpload}
            id="rom-loader"
            style={{ display: 'none' }}
          />

          {/* Botón personalizado que activa el input */}
          <label 
            htmlFor="rom-loader"
            style={{ 
              padding: '15px 40px', 
              background: 'transparent', 
              color: '#00ffa3', 
              border: '2px solid #00ffa3',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s',
              display: 'inline-block'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(0,255,163,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            LOAD_GBA_ROM
          </label>
          <p style={{ color: '#444', marginTop: '20px', fontSize: '0.7rem' }}>SUPPORTED_EXTENSIONS: .GBA</p>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1200px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>BOOTING_GBA_CORE... [OK]</span>
            <button 
              onClick={() => {
                setIsSystemActive(false);
                setRomUrl("");
              }}
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}
            >
              [ TERMINATE_PROCESS ]
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
            {/* CONTENEDOR DEL EMULADOR */}
            <div className="emu-screen-container" style={{ height: '600px' }}>
              <div className="scanline"></div>
              <iframe
                src={romUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; gamepad; fullscreen; keyboard"
                title="GBA Engine"
              ></iframe>
            </div>

            {/* PANEL DE ESPECIFICACIONES */}
            <div style={{ border: '1px solid #333', padding: '15px', fontSize: '0.8rem', background: '#0a0a0a', height: 'fit-content' }}>
              <h3 style={{ color: '#00ffa3', borderBottom: '1px solid #333', paddingBottom: '5px' }}>SYSTEM_SPECS</h3>
              <ul style={{ listStyle: 'none', marginTop: '10px', color: '#888', lineHeight: '1.8' }}>
                <li><b style={{ color: '#00ffa3' }}>CPU:</b> ARM7TDMI // 16.78 MHz</li>
                <li><b style={{ color: '#00ffa3' }}>VRAM:</b> 96 KB (Internal)</li>
                <li><b style={{ color: '#00ffa3' }}>WRAM:</b> 32 KB + 256 KB (External)</li>
                <li><b style={{ color: '#00ffa3' }}>RES:</b> 240 x 160 px</li>
                <li><b style={{ color: '#00ffa3' }}>COLOR:</b> 15-bit RGB</li>
              </ul>
              <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #444', color: '#444' }}>
                <small>ENGINE_STATUS: RUNNING</small><br/>
                <small>DECODING_ROM: SUCCESS</small>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 'auto', color: '#444', fontSize: '0.7rem', paddingTop: '40px' }}>
        © 2026 HARDWARE_LAB // ENCRYPTED_CONNECTION_ESTABLISHED
      </footer>
    </div>
  );
}

export default App;