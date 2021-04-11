const express = require('express')
const router = express.Router();
const Booking = require('../models/bookingModel');
const vefrification = require('../middleware/authentication')
const {todayDate}=require('../utils/utils')
const Product = require('../models/productModel');
const { selectFields } = require('express-validator/src/select-fields');
const async = require('async')

router.post('/product/booking', 
    vefrification.mainAuthentication,
    function(req,res){
    const productId = req.body.productId;
    const productCount = parseInt(req.body.productCount);
    const userId = req.user._id;
    const userAddress = "Not Added";
    const userphonenumber = req.user.Phone_number;
    const userEmail = req.user.Email;
    const bookedDate = todayDate(new Date());
    const bookedDate2 = new Date();
    

   
    Product.findOne({"_id":productId}).then((data)=>{
        if(data!=null)
        {
            Booking.findOne({"productId":data._id,"userId":req.user._id})
            .then((bookData)=>{
                if(bookData == null){
                    console.log(data.productPrice)
                    const productPrice = productCount * data.productPrice
                    const bookingData = new Booking({
                        productId : productId,
                        productCount : productCount,
                        productPrice : productPrice,
                        userId : userId,
                        userEmail : userEmail,
                        userAddress : userAddress,
                        userphonenumber : userphonenumber,
                        bookedDate : bookedDate,
                        bookedDate2 : bookedDate2
                    })
                    bookingData.save()
                    .then(function(result){
                        res.status(201).json({success:true,message : "Booking Saved !!"})
                    })
                    .catch(function(error){
                        console.log(error)
                        res.status(500).json({error : error})
                    })
                }
                else
                {
                    return res.status(202).json({"success":false,"message":"Product already exists in cart."})
                }
            }).catch((err)=>{
                console.log(err);
            })
          
        }
    })
   
    })

    router.delete('/booking/delete/:id', function(req,res){
        const id = req.params.id
        Booking.deleteOne({_id :id})
        .then(function(result){
            res.status(200).json({message : "Deleted !!"})
        })
        .catch(function(err){
            res.status(500).json({error : err})
        })
    })

    router.put('/booking/update',
    vefrification.mainAuthentication,
    function(req,res){
        const productCount = parseInt(req.body.productCount)
        // const userAddress = req.body.userAddress
        // const userphonenumber = req.body.userphonenumber
        // const userEmail = req.body.userEmail
        const id = req.body.id
        Booking.findOne({"_id":id}).then((data)=>{
            if(data!=null)
            {
                Product.findOne({"_id":data.productId}).then((data2)=>{
                    var price = productCount * data2.productPrice;
                    
                    Booking.updateOne({_id :id},{
                        productCount : productCount,
                        productPrice : price,
                        // userEmail : userEmail,
                        // userAddress : userAddress,
                        // userphonenumber : userphonenumber
                        
                    })
                    .then(function(result){
                        res.status(200).json({message : "Updated !!",success:true})
                    })
                    .catch(function(err){
                        res.status(500).json({error : err})
                    })
                })
            }
        })

})

router.get('/booking/retrive',vefrification.mainAuthentication, function(req,res){ 
    Booking.find({"userId":req.user._id}).sort({"bookedDate2":-1}).populate({
        path:"productId"
    })
    .then(function(data){
        
        return res.status(200).json({"success":true,data:data})
    })
    .catch(function(err){
        return res.status(202).json({message : err,success:false})
    })
})


router.post('/delete/bookedProducts',vefrification.mainAuthentication,(req,res)=>{
   
    let totalData = req.body['idContainer'];
   console.log(totalData)
    async.forEach(totalData,(i)=>{
        let query = Booking.findOne({"_id":i});
        query.then((data)=>{
            if(data!=null)
            {
                
                Booking.deleteOne({"_id":i}).then((result)=>{
                    
                }).catch((err)=>{
                 return res.status(404).json({"success":false,"message":"Deleted"})
                })
            }
            else
            {
                return res.status(202).json({"success":false,"message":"Cannot find data"})
            }
        })

    })
    return res.status(200).json({"success":true,"message":"Deleted"})
})


module.exports = router;