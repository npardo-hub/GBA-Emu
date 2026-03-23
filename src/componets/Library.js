import React from 'react';
import { useIndexedDB } from '../hooks/useIndexedDB';

const Library = ({ onSelectGame }) => {
  const { saveFile, STORE_ROMS } = useIndexedDB();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      await saveFile(STORE_ROMS, file.name, buffer);
      alert('Juego guardado en tu biblioteca local');
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded">
      <h3 className="text-xl mb-4">Mi Biblioteca</h3>
      <input type="file" accept=".gba" onChange={handleUpload} className="mb-4" />
      {/* Aquí mapearías los juegos guardados en IndexedDB */}
    </div>
  );
};

export default Library;