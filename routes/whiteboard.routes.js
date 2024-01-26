const express= require("express")
const auth = require("../middleware/user_jwt")

const Whiteboard = require("../models/whiteboard.model")
const { route } = require("./user.routes")

const router = express.Router()

router.post('/',auth,async (req,res,next)=>{
    try{
        const file=await Whiteboard.create({name:req.body.name,path:req.body.path,user:req.user.id})
        if(!file){
            res.status(400).json({
                success:false,
                msg:"didn't able to create whitevborad in mongoose"
            })
        }
        res.status(200).json({
            success:true,
            msg:"Successfully create the whiteborad in mongoose",
            whiteboard:file
        })
    }
    catch(error){
        console.log(`Error occur while creating the whiteborad:-${error}`);
    }
})

module.exports=router