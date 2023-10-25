const router =require('express').Router();
const Inventory = require('../models/inventaryModel')
const User = require('../models/userModels')
const authMiddleware =require('../middleware/authMiddleware');
const { message } = require('antd');
const mongoose = require("mongoose");

//add inventory (API  to get the report)
router.post('/add',authMiddleware,async(req,res)=>{
    try {
        // Check if user is hospital or donor ,validate email and inventory type
        const user = await User.findOne({email: req.body.email});
        if(!user) throw new Error("invalid Email");

        if(req.body.inventoryType === "in" && user.userType !=="donor") {
            throw new Error("This email is not registered as Donor")
        }
        if(req.body.inventoryType === "out" && user.userType !== "hospital"){
            throw new Error("The email is not Registered as Hospital")
        }
        // const inventory = new Inventory(req.body);

        if(req.body.inventoryType ==="out")
        {
            req.body.hospital = user._id;
            // inventory.organization = user._id;
        }
        else
        {
            req.body.donor = user._id;
            // inventory.donor = user._id;
        }
        // To addd inventory
        const inventory = new Inventory(req.body);
        await inventory.save();
        return res.send(
           { message:"Inventory added succesfully",
            success:true,}
        )
    } catch (error) {
        return res.send({
            success:false,
            message:error.message
        })
        
    }
});

module.exports = router;