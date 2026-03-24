import React, { useState } from 'react'
import { Nostalgist } from 'nostalgist'

function App() {
  const [status, setStatus] = useState('Esperando inicio...')
  const [launched, setLaunched] = useState(false)

  const startEmulator = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLaunched(true)
    setStatus('Configurando motor...')

    // Forzamos un ciclo de espera para que React pinte el DIV
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Buscamos el elemento directamente por ID para evitar fallos de 'ref'
      const container = document.getElementById('gba-canvas-container')
      
      if (!container) {
        throw new Error("El contenedor visual no se encontró en el DOM")
      }

      setStatus('Descargando núcleos de Libretro...')

      await Nostalgist.gba({
        rom: file,
        element: container,
      })

      setStatus(`Jugando: ${file.name}`)
    } catch (err) {
      console.error("Error detallado:", err)
      setStatus(`Fallo: ${err.message}`)
      // Si falla, permitimos reintentar
      setLaunched(false)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', background: '#121212', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#00e676' }}>GBA Hardware Lab</h1>
      
      <div style={{ margin: '20px', padding: '10px', background: '#333', borderRadius: '5px' }}>
        {status}
      </div>

      {/* CONTENEDOR CON ID ESTÁTICO */}
      <div 
        id="gba-canvas-container"
        style={{ 
          width: '640px', 
          height: '480px', 
          margin: '0 auto', 
          background: '#000',
          border: '4px solid #444',
          display: launched ? 'block' : 'none',
          position: 'relative'
        }}
      />

      {!launched && (
        <div style={{ marginTop: '30px' }}>
          <input 
            type="file" 
            accept=".gba" 
            onChange={startEmulator} 
            id="file-input" 
            style={{ display: 'none' }} 
          />
          <label 
            htmlFor="file-input" 
            style={{ 
              padding: '15px 30px', 
              background: '#3f51b5', 
              cursor: 'pointer', 
              borderRadius: '5px',
              fontSize: '1.2rem'
            }}
          >
            📂 Cargar Juego .GBA
          </label>
        </div>
      )}

      {launched && (
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Reiniciar Aplicación
        </button>
      )}
    </div>
  )
}

export default App