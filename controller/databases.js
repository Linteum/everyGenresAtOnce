const path = require("path");
const Datastore = require("nedb");

const dbPath = './databases/'

const db = {};
db.genres = new Datastore({
  filename: path.resolve(path.join(dbPath,"./genres.db")),
  autoload: true,
});

db.places = new Datastore({
  filename: path.resolve(path.join(dbPath,"./places.db")),
  autoload: true,
});

db.genres.ensureIndex({ fieldName: "genre", unique: true });
db.places.ensureIndex({ fieldName: "place", unique: true });

const cb = (err, newDoc) => {
  if (err) {
    if (err.errorType === "uniqueViolated") {
      return err.message;
    }
    return err;
  }
  return newDoc;
};

// console.log(db)
// POST add subjects from /api/subjects
async function addItem(table, obj) {
  switch (table) {
    case "genres":
      db.genres.insert(obj, cb);
      break;
    case "places":
      db.places.insert(obj, cb);
      break;
  }
}

async function insertAllAsync(table, items) {
  await Promise.all(
    items.map((o) => {
      addItem(table, o);
    })
  );
}

module.exports = {
  insertAllAsync,
};
