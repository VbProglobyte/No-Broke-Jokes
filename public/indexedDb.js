let indexedDb;
// database 
let db;
// REFS pull from activities - group project wont work alone 
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

function checkDatabase() {
  console.log('db online');

  // Open a transaction on your NoBrokeStore db
  let transaction = db.transaction(['NoBrokeStore'], 'readwrite');

  // access your NoBrokeStore object
  const store = transaction.objectStore('NoBrokeStore');

  // Get all records from store and set to a variable
  const getAll = store.getAll();

  // If the request was successful
  getAll.onsuccess = function () {
    // adding items to the storage when online success 
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another transaction to NoBrokeStore 
            transaction = db.transaction(['NoBrokeStore'], 'readwrite');
            // Assign the current store to a variable
            const currentStore = transaction.objectStore('NoBrokeStore');
            // existing entries to clear
            currentStore.clear();
          }
        });
    }
  };
}

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
