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
    posterId: fieldToVal.posterId,
    poster: fieldToVal.poster,
    text: fieldToVal.text,
    description: fieldToVal.description,
    date: fieldToVal.date,
    latitude: fieldToVal.latitude,
    longitude: fieldToVal.longitude
  });
}

function updatePost(pid, fieldToVal) {
  return db.updateById(ref, pid, {
    imageUrl: fieldToVal.imageUrl
  });
}

function interested(pid, uid) {
  return db.transaction(ref, id, "favoriteIds", function(favoriteIds) {
    favoriteIds = favoriteIds || [];
    favoriteIds.push(favId);
    return favoriteIds;
  });
}

function notifyNewPost() {
  db.listenForChanges(ref, function(post) {
    fcm.sendNotification(topic, newPostMsg);
  });
}

// EXPORTS
module.exports.interested = interested;
module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.createByAutoId = createByAutoId;
module.exports.notifyNewPost = notifyNewPost;
module.exports.ref = ref;
