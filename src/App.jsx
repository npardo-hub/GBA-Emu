import React, { useState, useRef } from 'react'
import { Nostalgist } from 'nostalgist'

function App() {
  const [status, setStatus] = useState('Listo para iniciar')
  const [active, setActive] = useState(false)
  const containerRef = useRef(null)

  const launchDemo = async () => {
    setStatus('Iniciando contenedor...')
    setActive(true)

    // Espera para asegurar que el div aparezca en el DOM
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      if (!containerRef.current) throw new Error("Contenedor no hallado")

      setStatus('Descargando Motor y ROM de prueba...')
      
      // Usamos una ROM de ejemplo (puedes cambiar esta URL por una tuya en public/)
      await Nostalgist.gba({
        rom: 'https://raw.githubusercontent.com/original-classic/gba-roms/main/test.gba',
        element: containerRef.current,
      })

      setStatus('¡Juego cargado!')
    } catch (err) {
      console.error("Error F12:", err)
      setStatus(`Fallo: ${err.message}`)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '40px', background: '#121212', minHeight: '100vh', color: 'white' }}>
      <h1>GBA Hardware Lab - Test Mode</h1>
      
      <div style={{ margin: '20px', padding: '10px', background: '#333' }}>
        {status}
      </div>

      <div 
        ref={containerRef} 
        style={{ 
          width: '480px', 
          height: '320px', 
          backgroundColor: '#000',
          display: active ? 'block' : 'none', 
          margin: '0 auto',
          border: '4px solid #444',
          position: 'relative'
        }} 
      />

      {!active && (
        <button 
          onClick={launchDemo}
          style={{ padding: '15px 30px', background: '#00e676', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🚀 PROBAR CON ROM DE PRUEBA
        </button>
      )}
    </div>
  )
}

export default App