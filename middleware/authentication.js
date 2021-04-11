const jwt = require('jsonwebtoken');
const User = require('../models/reg_model');


module.exports.mainAuthentication = function(req,res,next){
   try{
        const token = req.headers.authorization.split(" ")[1];
        const Userdata = jwt.verify(token, 'secretkey');

        User.findOne({ _id : Userdata.UsrId})
        .then(function(result){
            // res.send("Authorization success !!")
            // res.send(result);
           
            req.user = result;
            next()
        })
        .catch(function(error){
            res.status(500).json({ error : error})
        })
   } 
   catch(er){
   
       res.status(401).json({ message : "Authorization failed !!"})
   }
}

//next admin
module.exports.verifyAdmin = function(req, res, next) {
    if (!req.user) {
        return res.status(201).json({ message: "Unauthorized user!!" })
 
    } else if (req.user.Usertype !== 'Admin') {
        console.log(req.user._id)
        return res.status(201).json({ message: "Unauthorized!!!" })
    }
    next();
}

//next user - buyer
module.exports.verifyUser = function(req, res, next) {
 
    if (!req.user) {
        return res.status(201).json({ message: "Unauthorized user!!" })
 
    } else if (req.user.Usertype !== 'User') {
        return res.status(201).json({ message: "Unauthorized!!!" })
    }
    next();
}
   


//next admin
module.exports.verifyAdmin = function(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized user!!" })
 
    } else if (req.user.Usertype !== 'Admin') {
        console.log(req.user._id)
        return res.status(401).json({ message: "Unauthorized!!!" })
    }
    next();
}

//next user - buyer
module.exports.verifyUser = function(req, res, next) {
 
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized user!!" })
 
    } else if (req.user.Usertype !== 'User') {
        return res.status(401).json({ message: "Unauthorized!!!" })
    }
    next();
}