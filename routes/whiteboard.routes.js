const express= require("express")
const auth = require("../middleware/user_jwt")

const Whiteboard = require("../models/whiteboard.model")
const { route } = require("./user.routes")

const router = express.Router()
// Creating the new whiteboard in db
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
// Getting all whiteboards form db for particular person

router.get('/',auth,async(req,res,next)=>{
    try {
        const file=await Whiteboard.find({user:req.user.id})
        if(!file){
            res.status(400).json({
                success:false,
                msg:"not able to run query"
            })
        }

        res.status(200).json({
            success:true,
            whiteboard:file,
            msg:"Get all data successfully"
        })
    } catch (error) {
        console.log(`Error occurs while getting all data from the db`);
    }
})

// now we are updating the existing data or file in database

router.put('/:id',async (req,res,next)=>{
    try {
        let file=await Whiteboard.findById(req.params.id)
        if(!file) res.status(400).json({
            success:false,
            msg:"data not found"
        })
        else{
            file = await Whiteboard.findByIdAndUpdate(req.params.id,req.body,{
                new:true,
                runValidators:true
            })

            if(!file) res.status(400).json({success:false,msg:"Updation is not possible"})

            res.status(200).json({
                success:true,
                msg:"Updation Successfull",
                file:file
            })
        }

    } catch (error) {
        console.log(`Error while updating ${error}`);
    }
})

// route for deleting the whiteboard

router.delete('/:id',async(req,res,next)=>{
    try {
        let file= await Whiteboard.findById(req.params.id)
        console.log("1");
        if(!file) res.status(400).json({
            success:false,
            msg:"data not found"
        })
        else{
            console.log("2");
            file=await Whiteboard.findByIdAndDelete(req.params.id)
            console.log("3");
            if(!file) res.status(400).json({success:false,msg:"Deletion is not possible"})

            res.status(200).json({
                success:true,
                msg:"Deletion is Successfull",
            })
            console.log("4");
        }

    } catch (error) {
        console.log(`Error while doing delete operation ${error}`);
    }
})

module.exports=router