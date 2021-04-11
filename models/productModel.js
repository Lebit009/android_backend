const mongoose = require('mongoose');

const Product = mongoose.model('Product',{
    productName : {type : String},
    productPrice : {type : Number},
    productDescription : {type : String},
    productImage : {type : String},
    productRating : {type : String},
    productCategory:{type:String}
})

module.exports = Product;