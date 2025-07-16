const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf8"));
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getCollection(name) {
  const db = readDb();
  return db[name] || [];
}

function setCollection(name, newData) {
  const db = readDb();
  db[name] = newData;
  writeDb(db);
}

module.exports = {
  getCollection,
  setCollection,
};
