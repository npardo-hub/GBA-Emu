import React, { useState } from 'react'

function App() {
  const [gameLoaded, setGameLoaded] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const romData = event.target.result
      setGameLoaded(true)

      // Configuramos las variables globales que loader.js necesita
      window.EJS_player = '#game-container' // ID del div donde se dibujará
      window.EJS_core = 'gba'
      window.EJS_gameUrl = romData
      
      // RUTA LOCAL: Apunta a tu carpeta public/emu/data/
      window.EJS_pathtodata = '/emu/data/' 

      // Iniciamos el emulador si el script ya cargó
      if (typeof window.EJS_init === 'function') {
        window.EJS_init()
      } else {
        console.error("El script loader.js no se ha cargado correctamente.")
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      backgroundColor: '#0a0a0a', 
      minHeight: '100vh', 
      color: '#00ff41', // Verde Matrix/Terminal
      padding: '20px', 
      fontFamily: 'monospace' 
    }}>
      <h1 style={{ textShadow: '0 0 10px #00ff41' }}>[ HARDWARE LAB :: SYSTEM V4 ]</h1>

      {!gameLoaded ? (
        <div style={{ 
          marginTop: '50px', 
          border: '1px solid #00ff41', 
          padding: '40px', 
          display: 'inline-block',
          background: '#111' 
        }}>
          <p> ESPERANDO CARTUCHO...</p>
          <input 
            type="file" 
            accept=".gba" 
            onChange={handleFile} 
            style={{ marginTop: '20px', cursor: 'pointer' }}
          />
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          {/* Este es el div que busca window.EJS_player */}
          <div id="game-container" style={{ width: '100%', height: '500px', border: '2px solid #333' }}></div>
          
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              background: '#00ff41', 
              color: 'black', 
              border: 'none', 
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            REINICIAR SISTEMA
          </button>
        </div>
      )}
    </div>
  )
}

export default App