const mongoose = require('mongoose');

const Registration = mongoose.model('Registration',{
    First_name:{type: String, required: true },
    Last_name:{type: String, required: true},
    Email:{type: String, required: true, unique: true},
    Phone_number:{type: String, required: true, unique: true},
    Username:{type: String, required: true, unique: true},
    Password:{type: String, required: true},
    Usertype:{type: String,enum: ['Admin','User']}
})

module.exports= Registration;