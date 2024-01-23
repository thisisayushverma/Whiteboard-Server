const mongoose = require('mongoose')
const dbname = require('../constant.js')
const connectDB = async()=>{
    try{
        const connectInstance= await mongoose.connect(`${process.env.MONGO_URI}/${dbname}`)
        console.log(`MongoDb connect successfully :- ${connectInstance}`.green.underline.bold);
    }
    catch(error){
        console.log(`Mongo didn't connect ${process.env.MONGO_URI} sds:-${error}`.red.underline.bold);
        process.exit(1)
    }
}


module.exports=connectDB