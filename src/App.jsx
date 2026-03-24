import React, { useState } from 'react';

function App() {
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [romUrl, setRomUrl] = useState("");

  // Certificación de carga: Genera una URL de objeto para el motor Afterplay
  const handleRomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crea un enlace directo a la memoria del navegador
      const blobUrl = URL.createObjectURL(file);
      // Inyecta el parámetro ?rom= requerido por el software de Afterplay
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
      <header style={{ width: '100%', maxWidth: '900px', borderBottom: '1px solid #00ffa3', marginBottom: '30px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>
          [ HARDWARE_LAB_PREMIUM // CORE_V5 ]
        </h1>
        <p style={{ color: '#888', fontSize: '0.8rem' }}>STATUS: SYSTEM_READY // ENGINE: AFTERPLAY_CERTIFIED</p>
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
          <h2 style={{ marginBottom: '30px' }}>INSERT_MEDIA_TO_BYPASS_404</h2>
          
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleRomUpload}
            id="rom-loader"
            style={{ display: 'none' }}
          />

          <label 
            htmlFor="rom-loader"
            style={{ 
              padding: '15px 40px', 
              border: '2px solid #00ffa3',
              color: '#00ffa3',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'inline-block'
            }}
          >
             MOUNT_GBA_ROM
          </label>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>STREAMING_DATA_TO_CORE... [OK]</span>
            <button 
              onClick={() => { setIsSystemActive(false); setRomUrl(""); }}
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
            >
              [ TERMINATE_PROCESS ]
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
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

            <div style={{ border: '1px solid #333', padding: '15px', fontSize: '0.8rem', background: '#0a0a0a' }}>
              <h3 style={{ color: '#00ffa3', borderBottom: '1px solid #333' }}>SYSTEM_SPECS</h3>
              <ul style={{ listStyle: 'none', marginTop: '10px', color: '#888' }}>
                <li><b>CPU:</b> ARM7TDMI // 16.78 MHz</li>
                <li><b>VRAM:</b> 96 KB</li>
                <li><b>WRAM:</b> 256 KB</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;