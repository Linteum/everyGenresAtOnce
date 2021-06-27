const path = require("path");
const Datastore = require("nedb");

const dbPath = "./databases/";

const db = {};
db.genres = new Datastore({
  filename: path.resolve(path.join(dbPath, "./genres.db")),
  autoload: true,
});

db.places = new Datastore({
  filename: path.resolve(path.join(dbPath, "./places.db")),
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
  db[table].insert(obj, cb);
}

async function insertAllAsync(table, items) {
  await Promise.all(
    items.map((o) => {
      addItem(table, o);
    })
  );
}

const getItems = async (tableName, searchString) => {
  return new Promise((resolve, reject) => {
    const regex = new RegExp(searchString.trim());
    console.log(regex);
    switch (tableName) {
      case "genres":
        db.genres.find({ genre: regex }, (err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        });
        break;

      case "places":
        db.places.find({ place: regex }, (err, docs) => {
          if (err) return reject(err);
          console.log(docs)
          return resolve(docs);
        });
        break;
    }
  });
};

module.exports = {
  insertAllAsync,
  getItems,
};
