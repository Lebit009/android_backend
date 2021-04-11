const mongoose = require('mongoose');
const {ObjectId} = require('bson');
const Product = require('./productModel');

const Booking = mongoose.model('Booking',{
    productId : {type : ObjectId, ref:Product},
    productCount : {type : Number},
    userId : {type : ObjectId},
    productPrice : {type :Number},
    userAddress : {type :String},
    userphonenumber : {type : String},
    userEmail : {type : String},
    bookedDate : {type :String},
    bookedDate2 : {type :Date}
})

module.exports = Booking;