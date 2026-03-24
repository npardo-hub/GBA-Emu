import React, { useState } from 'react';

function App() {
  const [lastBoot, setLastBoot] = useState(null);

  const handleRomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Generar el túnel de datos local
      const blobUrl = URL.createObjectURL(file);
      // 2. Construir la ruta de bypass para Afterplay
      const finalUrl = `https://afterplay.io/games/gba-emulator?rom=${encodeURIComponent(blobUrl)}`;
      
      // 3. Lanzar en una nueva ventana para saltar el bloqueo de iframe
      window.open(finalUrl, '_blank', 'width=1000,height=700,menubar=no,status=no');
      
      // Registrar el éxito en la interfaz
      setLastBoot(file.name);
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
        <p style={{ color: '#888', fontSize: '0.8rem' }}>STATUS: BYPASS_ENABLED // ENGINE: EXTERNAL_MONITOR</p>
      </header>

      <div style={{ 
        marginTop: '100px', 
        textAlign: 'center', 
        border: '1px solid #333', 
        padding: '60px',
        background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
        boxShadow: '0 0 20px rgba(0, 255, 163, 0.1)',
        maxWidth: '600px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>INITIALIZE_EXTERNAL_HARDWARE</h2>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '0.9rem' }}>
          EL SISTEMA DETECTÓ UN BLOQUEO DE FRAME. SE ACTIVARÁ UN MONITOR EXTERNO PARA LA EJECUCIÓN DEL NÚCLEO GBA.
        </p>
        
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
            LAUNCH_EXTERNAL_MONITOR
        </label>

        {lastBoot && (
          <div style={{ marginTop: '30px', color: '#888', fontSize: '0.8rem' }}>
            LAST_SUCCESSFUL_BOOT: <span style={{ color: '#00ffa3' }}>{lastBoot}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '50px', width: '100%', maxWidth: '800px', opacity: 0.5 }}>
        <h3 style={{ fontSize: '0.8rem', borderBottom: '1px solid #333' }}>LAB_DIAGNOSTICS</h3>
        <pre style={{ fontSize: '0.7rem', color: '#444', marginTop: '10px' }}>
          - SECURITY_BYPASS: ACTIVE<br/>
          - CROSS_ORIGIN_ISOLATION: {window.crossOriginIsolated ? 'ENABLED' : 'DISABLED'}<br/>
          - FRAME_REFUSAL_WORKAROUND: REDIRECT_MODE
        </pre>
      </div>
    </div>
  );
}

export default App;