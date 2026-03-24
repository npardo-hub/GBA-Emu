import React, { useState, useRef } from 'react'
import { Nostalgist } from 'nostalgist'

function App() {
  const [status, setStatus] = useState('Esperando ROM...')
  const [active, setActive] = useState(false)
  const containerRef = useRef(null)

  const handleLaunch = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  setStatus('Iniciando mGBA...')
  setActive(true)

  try {
    await Nostalgist.gba({
      rom: file,
      element: containerRef.current,
      // ESTO ES CLAVE: Le decimos de dónde bajar el motor mGBA exacto
      core: 'mgba', 
    })
    setStatus(`Jugando: ${file.name}`)
  } catch (err) {
    console.error("Error detallado:", err)
    setStatus('Error: Revisa la consola (F12)')
    setActive(false)
  }
}

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ color: '#00e676' }}>GBA Emulator Premium</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#333', borderRadius: '8px' }}>
        {status}
      </div>

      {/* Contenedor del emulador */}
      <div 
        ref={containerRef} 
        style={{ 
          width: '640px', 
          height: '480px', 
          backgroundColor: '#000',
          display: active ? 'block' : 'none',
          margin: '0 auto',
          border: '4px solid #444'
        }} 
      />

      {!active && (
        <div style={{ marginTop: '40px' }}>
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleLaunch} 
            id="gba-file" 
            style={{ display: 'none' }} 
          />
          <label 
            htmlFor="gba-file" 
            style={{ 
              padding: '15px 30px', 
              background: '#3f51b5', 
              color: 'white', 
              borderRadius: '5px', 
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            📂 Cargar Archivo .GBA
          </label>
        </div>
      )}

      {active && (
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Reiniciar / Cerrar
        </button>
      )}
    </div>
  )
}

export default App