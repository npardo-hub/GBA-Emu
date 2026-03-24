import React, { useState } from 'react';

function App() {
  const [isSystemActive, setIsSystemActive] = useState(false);

  // Esta URL es un contenedor genérico de Afterplay que permite cargar ROMS
  // Puedes personalizarla más adelante con una API Key si decides escalar
  const afterplayUrl = "https://afterplay.io/games/gba-emulator";

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
          <h2 style={{ marginBottom: '30px' }}>INITIALIZE VIRTUAL GBA?</h2>
          <button 
            onClick={() => setIsSystemActive(true)}
            style={{ 
              padding: '15px 40px', 
              background: 'transparent', 
              color: '#00ffa3', 
              border: '2px solid #00ffa3',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(0,255,163,0.1)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
             RUN_SEQUENCER
          </button>
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '1000px', height: '700px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>BOOTING_GBA_CORE...</span>
            <button 
              onClick={() => setIsSystemActive(false)}
              style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold' }}
            >
              [ TERMINATE_PROCESS ]
            </button>
          </div>

          {/* CONTENEDOR DEL EMULADOR */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            border: '1px solid #333', 
            borderRadius: '10px', 
            overflow: 'hidden',
            backgroundColor: '#000'
          }}>
            <iframe
              src={afterplayUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; gamepad"
              allowFullScreen
              title="Afterplay GBA"
            ></iframe>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 'auto', color: '#444', fontSize: '0.7rem' }}>
        © 2026 HARDWARE_LAB // ENCRYPTED_CONNECTION_ESTABLISHED
      </footer>
    </div>
  );
}

export default App;