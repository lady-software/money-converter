const idb = require("idb");


const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
    upgradeDB.createObjectStore('keyval');
});


//const dbPromise = idb.open('keyval-store', 1, upgradeDB => {
//            switch (upgradeDB.oldVersion) {
//                case 0:
//                    upgradeDB.createObjectStore('keyval');
//                case 1:
//                    upgradeDB.createObjectStore('conversions');
//                // upgradeDB.createObjectStore('conversions', {keyPath: 'id'});
//            }
//});

//module.exports = dbPromise;

///*export default class db {
//    constructor() {
//        this.dbPromise = idb.open('keyval-store', 1, upgradeDB => {
//            switch (upgradeDB.oldVersion) {
//                case 0:
//                    upgradeDB.createObjectStore('keyval');
//                case 1:
//                    upgradeDB.createObjectStore('conversions');
//                // upgradeDB.createObjectStore('conversions', {keyPath: 'id'});
//            }
//        });
//    }

//    addData(store, id, data) {
//        this.dbPromise.then(db => {
//            const tx = db.transaction(store, 'readwrite');
//            tx.objectStore(store).put(data, id);
//            return tx.complete;
//        });
//    }

//    getData(store, id) {
//        this.dbPromise.then(db => {
//            return db.transaction(store)
//                .objectStore(store).get(id);
//        }).then(obj => {
//            console.log(obj)
//            return obj
//        });
//    }
//}*/