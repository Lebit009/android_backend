const express = require('express')
const router = express.Router();
const Product = require('../models/productModel');
const vefrification = require('../middleware/authentication')
const upload = require('../middleware/upload')

router.post('/product/insert', 
    vefrification.mainAuthentication,
    vefrification.verifyAdmin,
    upload.single('productImage'),
 function(req,res){
     
    //  console.log(req.file);
    // if(req.fileValidationError)
    
    if(req.file == undefined)
    {
        console.log("Inappropriated File format");
        return res.status(400).json({message:"Inappropriated File format"});
        // return res.status(400).json({message : "Invalid credentials"}
    }
    const productImage = req.file.path
    const productName = req.body.productName
    const productDescription = req.body.productDescription
    const productPrice = req.body.productPrice
    const productRating = req.body.productRating
    const productCategory = req.body.productCategory

    const ProductData = new Product({
        productImage : productImage,
        productName : productName,
        productDescription : productDescription,
        productPrice : productPrice,
        productRating : productRating,
        productCategory:productCategory
    })
    ProductData.save()
    .then(function(result){
        res.status(201).json({success:true,message : "Product Saved !!"})
    })
    .catch(function(error){
        res.status(500).json({error : error})
    })
})

router.put('/product/update/:id',
    vefrification.mainAuthentication,upload.single('productImage'),
    function(req,res){
    console.log("kk")
    const productImage = req.file.path
    const productName = req.body.productName
    const productDescription = req.body.productDescription
    const productPrice = req.body.productPrice
    const productRating = req.body.productRating
    const id = req.params.id
    Product.updateOne({_id :id},{
        productImage : productImage,
        productName : productName,
        productDescription : productDescription,
        productPrice : productPrice,
        productRating : productRating,
    })
    .then(function(result){
        res.status(200).json({success:true ,data:result,message : "Updated !!"})
    })
    .catch(function(err){
        res.status(500).json({error : err, success:false})
    })
})

router.delete('/product/delete/:id', function(req,res){
    const id = req.params.id
    Product.deleteOne({_id :id})
    .then(function(result){
        res.status(200).json({message : "Deleted !!"})
    })
    .catch(function(err){
        res.status(500).json({error : err})
    })
})

router.post('/product/getall', function(req,res){
    let category = req.body.category;

    Product.find({"productCategory":category})
    .then(function(data){
        console.log(data);
        return res.status(200).json({"success":true,data:data})
    })
    .catch(function(err){
        return res.status(202).json({message : err,success:false})
    })
})

router.get('/product/getallVehicles', function(req,res){
    Product.find({})
    .then(function(data){
       
        return res.status(200).json({"success":true,data:data})
    })
    .catch(function(err){
        return res.status(202).json({message : err,success:false})
    })
})

router.get('/product/showall/:id', function(req,res){
    const id = req.params.id
    console.log(id)
    Product.findOne({_id : id})
    .then(function(data) {
console.log(data)
        res.status(200).json(data)
    })
    .catch(function(e) {
        res.status(500).json({ error: e })
    })
})

module.exports = router;