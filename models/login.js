const mongoose = require("mongoose");

// quiz Schema
let loginSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: Number
});

const user = (module.exports = mongoose.model("login", loginSchema));

// Get Users
module.exports.getUsers = (callback, limit) => {
    user.find(callback).limit(limit);
};

// Add User
module.exports.addUsers = (users, callback) => {
    user.create(users, callback);
};

//Update User 
module.exports.updateUser = (id, q, options, callback) => {
    var query = { _id: id };
    var update = {
        email: q.email,
        password: q.password,
        name: q.name,
        phone: q.phone
    };
    user.findOneAndUpdate(query, update, options, callback);
};

// delete user
module.exports.removeUser = (id, callback) => {
    var query = { _id: id };
    user.deleteMany(query, callback);
};