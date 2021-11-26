import Dexie from "dexie";

//create the database
const db = new Dexie("contactList");
//create the store
db.version(1).stores({
    contacts: "id++,name, email, phone"
})
db.open().catch((err) => {
    console.log(err.stack || err)
})

export default db;