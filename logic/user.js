// DEPENDENCIES
const db = require("../util/db.js");

// REF
const ref = db.refs.userRef;

// METHODS
function getById(id) {
  return db.getById(ref, id);
}

function createByManualId(id, fieldToVal) {
  console.log("got inside createByManualId logic")
  return db.createByManualId(ref, id, {
    name: fieldToVal.name,
    username: fieldToVal.username,
    email: fieldToVal.email,
    imageUrl: fieldToVal.imageUrl,
  });
}

function interested(id, favId) {
  return db.transaction(ref, id, "favoriteIds", function(favoriteIds) {
    favoriteIds = favoriteIds || [];
    favoriteIds.push(favId);
    return favoriteIds;
  });
}
// EXPORTS
module.exports.getById = getById;
module.exports.createByManualId = createByManualId;
module.exports.interested = interested;
module.exports.ref = ref;
