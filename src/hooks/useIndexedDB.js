import { openDB } from 'idb';

const DB_NAME = 'GBA_EMU_DB';
const STORE_ROMS = 'roms';
const STORE_SAVES = 'saves';

export const useIndexedDB = () => {
  const initDB = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        db.createObjectStore(STORE_ROMS);
        db.createObjectStore(STORE_SAVES);
      },
    });
  };
  const saveFile = async (store, name, data) => {
    const db = await initDB();
    await db.put(store, data, name);
  };
  const getFile = async (store, name) => {
    const db = await initDB();
    return db.get(store, name);
  };

  return { saveFile, getFile, STORE_ROMS, STORE_SAVES };
};