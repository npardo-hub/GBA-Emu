import React, { useState, useRef } from 'react'
import { Nostalgist } from 'nostalgist'

function App() {
  const [status, setStatus] = useState('Esperando ROM...')
  const [active, setActive] = useState(false)
  const containerRef = useRef(null)

  const handleLaunch = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // 1. Limpiamos cualquier rastro anterior
    setStatus('Configurando entorno...')
    setActive(true)

    try {
      // 2. Pequeña espera para asegurar que el DOM se dibujó
      await new Promise(resolve => setTimeout(resolve, 200))

      if (!containerRef.current) {
        throw new Error("No se encontró el contenedor visual en el DOM")
      }

      setStatus('Descargando motor mGBA (esto puede tardar)...')
      
      // 3. Lanzamiento con configuración explícita
      await Nostalgist.launch({
        core: 'mgba',
        rom: file,
        element: containerRef.current,
      })

      setStatus(`Jugando: ${file.name}`)
    } catch (err) {
      console.error("ERROR CRÍTICO F12:", err)
      // Si el error dice 'SharedArrayBuffer', es por las cabeceras
      if (err.message.includes('SharedArrayBuffer')) {
        setStatus('Error de seguridad del navegador. Revisa cabeceras.')
      } else {
        setStatus(`Fallo: ${err.message}`)
      }
      setActive(false)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#00e676', marginBottom: '30px' }}>GBA Hardware Lab</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#333', borderRadius: '10px', display: 'inline-block', border: '1px solid #555' }}>
        <strong>Estado:</strong> {status}
      </div>

      <div 
        ref={containerRef} 
        id="emulator-container"
        style={{ 
          width: '640px', 
          height: '480px', 
          backgroundColor: '#000',
          display: active ? 'block' : 'none', 
          margin: '20px auto',
          border: '5px solid #444',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden'
        }} 
      />

      {!active && (
        <div style={{ marginTop: '50px' }}>
          <input type="file" accept=".gba" onChange={handleLaunch} id="gba-input" style={{ display: 'none' }} />
          <label htmlFor="gba-input" style={{ padding: '20px 40px', background: '#3f51b5', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            🎮 SELECCIONAR JUEGO (.GBA)
          </label>
        </div>
      )}

      {active && (
        <button onClick={() => window.location.reload()} style={{ marginTop: '30px', padding: '10px 25px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Cerrar y Salir
        </button>
      )}
    </div>
  )
}

export default App