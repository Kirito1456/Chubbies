const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema( {
    name: { type: String, required: true },
    address: { type: String, required: true },
    username: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
    contact_no: { type: String, required: true },
    pic: {type:String}
});
//name of the schema, usersSchema (the var)
module.exports = mongoose.model('users', usersSchema);