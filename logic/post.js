// DEPENDENCIES
const db = require("../util/db.js");
const fcm = require("../util/fcm.js");

// REF
const ref = db.refs.postRef;
const topic = "new-post";
const newPostMsg = "A new post has been added";

// METHODS
function getAll() {
  return db.getAll(ref);
}

function getById(id) {
  return db.getById(ref, id);
}

function createByAutoId(fieldToVal) {
  return db.createByAutoId(ref, {
    imageUrl: fieldToVal.imageUrl,
    posterId: fieldToVal.posterId
  });
}

function notifyNewPost() {
  db.listenForChanges(ref, function(post) {
    fcm.sendNotification(topic, newPostMsg);
  });
}

// EXPORTS
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.createByAutoId = createByAutoId;
module.exports.notifyNewPost = notifyNewPost;
module.exports.ref = ref;
