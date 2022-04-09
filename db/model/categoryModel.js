const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        ref:"Product"
    },
    description:{
        type:String,
        required:true,
        trim:true,
    }


})

categorySchema.virtual('categoryProds', {
    ref:"Product",
    localField:"name",
    foreignField:"category.name"
})

const Category =  mongoose.model("Category",categorySchema)

module.exports = Category