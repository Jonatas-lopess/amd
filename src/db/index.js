import Dexie from 'dexie';

export const db = new Dexie('AMD_DB');
db.version(1).stores({
    files: "id, value",
});