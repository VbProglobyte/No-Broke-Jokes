let indexedDb;
// database 
let db;
// REFS
// "noBrokeDB"
// "NoBrokeStore"

// // request for creating new database - "noBrokeDB"
const request = indexedDB.open('noBrokeDB', 1);

////////////////////////////////////////////////////////////////////     // 

// UPGRADE - need ----------------------------------------------
request.onupgradeneeded = function (e) {
  db = e.target.result;
  // console.log(...)
  // db.createObjectStore(storeName, { keyPath: "_id" });
  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;
  console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);
  // db = request.result;
  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore('NoBrokeStore', { autoIncrement: true });
  }
};
// ERROR - error code -----------------------------------------------
request.onerror = function (e) {
  console.log(`There was an Error: ${e.target.errorCode}`);
};
// SUCCESS  - db result successful ----------------------------------
request.onsuccess = function (e) {
  console.log("DB created successfully");
  db = e.target.result;
  // app is online?
  if (navigator.onLine) {
    // console.log("Online");
    checkDatabase();
  }
};



// //////////////////////////////////////////////////////////////////////

const saveRecord = (record) => {
  // NoBrokeStore db with readwrite access
  const transaction = db.transaction(['NoBrokeStore'], 'readwrite');

  // Access your NoBrokeStore
  const store = transaction.objectStore('NoBrokeStore');

  // Add record to your store with add method.
  store.add(record);
};

// Listener for app ONLINE 
window.addEventListener('online', checkDatabase);
