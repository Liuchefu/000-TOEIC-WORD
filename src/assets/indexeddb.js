// db.js (例)

import Dexie from 'dexie'

const db = new Dexie('MyDatabase')

db.version(1).stores({
  // '++id'とすることで、IDが自動で連番になります
  rerekistore: '++id, vocabulary',
  dataStore: '++id, vocabulary',
})

export default db
