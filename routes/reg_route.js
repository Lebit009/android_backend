const express = require('express');
const Registration = require('../models/reg_model');

const jwt = require('jsonwebtoken')

const router= express.Router();
const {check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs');
const {getValidation} = require('../utils/utils');

router.post('/registration/insert',
[
    check('Username',"Username is required !!.").not().isEmpty(),
    check('Email',"Email is required !!.").not().isEmpty(),
    check('Email',"Invalid email !!.").isEmail(),
    check('Phone_number',"Phone number required !!.").isMobilePhone()
],
function(req,res){
    const error = validationResult(req);
    if (error.isEmpty()){
        const firstname = req.body.First_name;
        const lastname= req.body.Last_name;
        const mail= req.body.Email;
        const number= req.body.Phone_number;
        const username= req.body.Username;
        const password= req.body.Password;
        const Usertype = req.body.Usertype
        
        
        bcryptjs.hash(password,10,function(err,hash){
            
            
                Registration.find({}).then((data)=>{
                    var getValidations = getValidation({"username":username,"phone":number,"email":mail},data);
                    if(getValidations == true)
                    {
                    const data = new Registration({
                        First_name :firstname,
                        Last_name :lastname,
                        Email: mail,
                        Phone_number: number,
                        Username: username,
                        Password:hash,
                        Usertype:Usertype
                    })
                    data.save()
                    .then(function(result){
                        console.log(data)
                        return res.status(200).json({message: "Registration sucessfull !!",success : true})
                    })
                    .catch(function(error){
                        return res.status(500).json({err: error})
                    })
                }
                else
                {
                    return res.status(201).json({"success":false,"message":getValidations});
                }
                })
            
            
           
           
        })
    }
    else{
        //invalid data from client
        res.status(400).json(error.array())
    }
})
router.post('/registration/login',function(req,res){
  const Username = req.body.us
  const Password = req.body.pwd
  Registration.findOne({Username : Username})
    .then(function(usrdata){
        //username not found
        if(usrdata === null){
            return res.status(201).json({sucess:false})
         }
         //comparing password
         bcryptjs.compare(Password, usrdata.Password,function(err,result){
            if(result === false){
                
                //username correct but not password
                return res.status(201).json({sucess:false}
                    )
                
             }
        //generate token
            const token = jwt.sign({UsrId : usrdata._id}, 'secretkey');
            console.log("Logged In")
            res.status(200).json({token : token, success:true,data:usrdata})
           
         })
    })
    .catch(function(error){
        res.status(500).json({err: error})
    })
})

module.exports = router;