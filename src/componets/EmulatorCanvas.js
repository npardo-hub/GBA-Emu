import React, { useEffect, useRef } from 'react';

const EmulatorCanvas = ({ onReady }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Enviar el canvas al worker o inicializar localmente 
      // si prefieres no usar workers para el renderizado
      onReady(canvasRef.current);
    }
  }, [onReady]);

  return (
    <div className="relative border-8 border-gray-800 rounded-lg bg-black p-2 shadow-2xl">
      <canvas 
        ref={canvasRef} 
        id="canvas"
        className="w-full h-auto image-pixelated max-w-[480px]"
        width="240" 
        height="160"
      />
    </div>
  );
};

export default EmulatorCanvas;