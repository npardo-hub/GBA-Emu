const handleKeyDown = (key) => {
  // Basado en main.c de mGBA
  const keys = {
    'ArrowUp': 0x0040,   // GBA_KEY_UP
    'ArrowDown': 0x0080, // GBA_KEY_DOWN
    'ArrowLeft': 0x0020, // GBA_KEY_LEFT
    'ArrowRight': 0x0010,// GBA_KEY_RIGHT
    'z': 0x0001,         // GBA_KEY_A
    'x': 0x0002,         // GBA_KEY_B
    'Enter': 0x0008,     // GBA_KEY_START
    'Shift': 0x0004      // GBA_KEY_SELECT
  };
  
  if (keys[key]) {
    // Si usas el worker, envía el código de tecla
    worker.postMessage({ type: 'KEY_DOWN', key: keys[key] });
  }
};