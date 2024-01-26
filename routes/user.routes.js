const express = require("express")
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const bcryptjs =require('bcryptjs')
const user_jwt = require("../middleware/user_jwt");
const { token } = require("morgan");

router.get('/',user_jwt,async (req,res,next)=>{
    try{
        const user= await User.findById(req.user.id).select('-password')
        res.status(200).json({
            msg:"User Found",
            user:user
        })
    }
    catch(error){
        console.log(`Error occur in the login  ${error}`);
    }
})

router.post('/register',async (req,res,next)=>{
    const { name, email, password } = req.body;

    try{
        const user_exist = await User.findOne({email:email})
        if(user_exist){
            res.status(400).json({
                success:false,
                msg:"User already exist"
            })
        }
        let user= new User()
        user.name=name
        user.email=email
        
        const enpass= await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password,enpass)
        let avasize=200
        user.avatar="https://gravatar.com/avatar/?s"+avasize+"&d=retro"

        await user.save()

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload, process.env.jwtSecToken,{
            expiresIn:36000
        },(err,token)=>{
            if(err) throw err
            res.status(200).json({
                success:true,
                token:token
            })
        })


        // res.json({
        //     success:true,
        //     msg:'Successfully Registered',
        //     user:user
        // })

    }
    catch(err){
        console.log(`operation in the routes make issues,${err}`);
    }
})

router.post('/login',async (req,res, next)=>{
    const email=req.body.email
    const password = req.body.password

    try{
        const user= await User.findOne({email:email})

        if(!user){
            res.status(404).json({
                success:false,
                msg:"User not found"
            })
        }

        const ifverify =await bcryptjs.compare(password,user.password)
        if(!ifverify){
            res.status(400).json({
                success:false,
                msg:"Invalid password"
            })
        }

        const payload={
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,process.env.jwtSecToken,{
            expiresIn:360000
        },(err,token)=>{
            if(err) throw err
            res.status(200).json({
                success:true,
                msg:"User logged in Successfully",
                token:token,
                user:user
            })
        })

    }
    catch(error){
        console.log(`Problem occur in loggin ${error}`);
    }
})

module.exports =router