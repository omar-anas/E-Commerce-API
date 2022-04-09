// const mongoose = require('mongoose')

// const orderSchema = new mongoose.Schema({
    
//     productID:{
//         type:mongoose.Schema.Types.ObjectId,
//         unique:true,
//         required:true,
//         trim:true,
//         ref:"Product"
//     },
//     userID:{
//         type: mongoose.Schema.Types.ObjectId,
//         required:true,
//         trim:true,
//     }


// })

// orderSchema.virtual('myOrders',{
//     ref:'Product',
//     localField:'productID',
//     foreignField:'_id'
// })



// const Order =  mongoose.model("Order",orderSchema)

// module.exports =  Order