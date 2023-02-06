import Dexie from 'dexie';

if (!('indexedDB' in window)) {
    console.warn('IndexedDB not supported')
}

export const db = new Dexie('AMD_DB');
db.version(1).stores({
    files: "id, value",
});