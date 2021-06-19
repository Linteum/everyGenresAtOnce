const path = require("path");
const  Datastore = require("nedb")

var  db = new Datastore({
    filename: path.resolve('./places.db'),
    autoload: true,
  });

db.ensureIndex({ fieldName: "place", unique: true });

// console.log(db)
// POST add subjects from /api/subjects
module.exports = (obj) => {
  return new Promise((resolve, reject) => {
    db.insert(obj, (err, newDoc) => {
      if (err) {
        if (err.errorType === "uniqueViolated") {
          return resolve(err.message);
        }
        return reject(err);
      }
      return resolve(newDoc);
    });
  });
};



