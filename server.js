const express = require('express')
const colors = require('colors')
const  morgan = require('morgan')
const dotenv= require('dotenv')
const connectDB =require('./db/dbconfig')


const app = express();

dotenv.config({
    path:'./.env'
})
connectDB()
app.use(morgan('dev'))
// middle ware use    -> app.use => for the implement the middleware
// app.use((req,res,next)=>{
//     console.log("sdfdsfdsfsdfsdf");
//     req.temp="asdfdsf"

//     next()
// })

// router for the signup page
app.use(express.json({}))
app.use(express.json({
    extended:true
}))

app.use('/api/todo/auth',require("./routes/user.routes.js"))

const PORT =process.env.PORT || 3000
app.listen(PORT,console.log(`YOur app listen in ${PORT}`.red.underline.bold))
