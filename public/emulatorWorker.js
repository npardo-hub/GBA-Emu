importScripts('public/wasm/mgba.js');

let emulator = null;

self.onmessage = async (e) => {
  const { type, payload } = e.data;

  if (type === 'START') {
    // La función mGBA es global gracias a importScripts
    try {
      emulator = await mGBA({
        canvas: payload.canvas, // OffscreenCanvas si lo envías desde el main thread
        locateFile: (path) => `/wasm/${path}`
      });

      // Inicializar el sistema de archivos virtual (necesario según tu mgba.d.ts)
      await emulator.FSInit();
      
      self.postMessage({ type: 'READY' });
    } catch (err) {
      console.error("Error al iniciar emulador:", err);
    }
  }

  if (type === 'LOAD_ROM') {
    const { fileName, buffer } = payload;
    
    // Crear la ruta en el sistema de archivos virtual
    const path = `/data/games/${fileName}`;
    emulator.FS.writeFile(path, new Uint8Array(buffer));
    
    // Usar el método loadGame definido en tu pre.js
    const success = emulator.loadGame(path);
    
    if (success) {
      self.postMessage({ type: 'PLAYING' });
    }
  }
};