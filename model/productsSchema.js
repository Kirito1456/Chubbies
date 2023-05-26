const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema( {
    productNumber:{ type: Number}, 
    name: { type: String},
    category: { type: String},
    price: { type: Number},
    stock: { type: Number},
    description: { type: String}, 
    pic: { type: String}
});
//name of the schema, productsSchema (the var)
module.exports = mongoose.model('products', productsSchema);