// {
//     admin id:1,
//     title:'...',
//     price:'...',
//     category:'...',
//     description:'...',
//     image:'...'
// }
const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    
    adminID:{
        type:String,
        required:true,
        trim:true,
        ref:"User"

    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true
    },
    category:[
{       type:String ,
        required:true, 
        ref:"Category"}
    ],
    
    description:{
        type:String,
        required:true,
        trim:true,
    },
    // image:{
    //     type:String,
    //     required:true,
    //     trim:true,
    // }


})

const Prod =  mongoose.model("Product",productSchema)

module.exports = Prod