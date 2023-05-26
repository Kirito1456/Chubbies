const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema( {
    orderNumber: { type: Number }, 
    pname:[String],
    pprice:[Number],
    username: { type: String,},
    address: { type: String},
    contact_no: { type: Number},
    date: { type: String},
    price: { type: Number},
    items:[Number],
});
//name of the schema, orderSchema (the var)
module.exports = mongoose.model('order', orderSchema);