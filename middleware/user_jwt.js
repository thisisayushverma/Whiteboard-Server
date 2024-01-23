const jwt = require("jsonwebtoken")

module.exports = async function(req,res,next){
    const token= req.header('Authorization')
    if(!token){
        return res.status(401).json({
            msg:"no token,authorization"
        })
    }
    try{
        await jwt.verify(token,process.env.jwtSecToken,(err,decode)=>{
            if(err){
                res.status(401).json({
                    msg:"TOken is not valid"
                })
            }
            else{
                req.user=decode.user
                next()
            }
        })
    }
    catch(error){
        console.log(`Something went wrong with middleware:- ${error}`);
        res.status(500).json({
            msg:"server error"
        })
    }
}