import React, { useState } from 'react';

function App() {
  const [status, setStatus] = useState("READY");

  const launchHardware = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const engineUrl = `https://afterplay.io/games/gba-emulator?rom=${encodeURIComponent(blobUrl)}`;
      
      // Abrir en ventana independiente para saltar todos los bloqueos
      window.open(engineUrl, '_blank', 'width=1000,height=700');
      setStatus(`EXECUTING: ${file.name}`);
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#00ffa3', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
      <h1 style={{ borderBottom: '1px solid #00ffa3', paddingBottom: '10px' }}>[ HARDWARE_LAB_V5 // BYPASS_MODE ]</h1>
      
      <div style={{ marginTop: '50px', border: '1px solid #333', padding: '40px', textAlign: 'center', background: '#0a0a0a' }}>
        <p style={{ marginBottom: '20px', color: '#888' }}>SYSTEM_STATUS: {status}</p>
        
        <input type="file" accept=".gba" onChange={launchHardware} id="loader" style={{ display: 'none' }} />
        <label htmlFor="loader" style={{ padding: '15px 30px', border: '2px solid #00ffa3', cursor: 'pointer', fontWeight: 'bold' }}>
           LOAD_ROM_TO_EXTERNAL_MONITOR
        </label>
      </div>
      
      <div style={{ marginTop: '40px', fontSize: '0.7rem', color: '#444', maxWidth: '500px' }}>
        <p>DIAGNOSTICS: El modo de ventana externa evita las restricciones de seguridad (CSP) que bloquean el emulador dentro de la página.</p>
      </div>
    </div>
  );
}

export default App;