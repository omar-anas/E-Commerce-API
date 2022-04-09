const mongoose = require('mongoose')
const Prod = require('../db/model/productsModel')

class prodsContoller {

    static addProduct = async (req,res)=>{
        try {
            const user = req.user;
            req.body.adminID = user._id  
            const product = new Prod(req.body);
            await product.save()
            res.status(200).send({apiStatus:true, data:product, message:"added successfully"})

            
        } catch (error) {
            res.status(200).send({apiStatus:false, error:error.message, message:"failed"})
            
        }
        

    }



    static readAllProdsAdminAdded = async (req , res)=>{
        try {
           
            await req.user.populate('Admin_Products')
            
            res.status(200).send({apiStatus:true, data:req.user.Admin_Products, message:"retrived successfully"})
            
        } catch (error) {
            res.status(200).send({apiStatus:false, error:error.message, message:"failed"})
        }
    }



    


    static deleteProduct = async (req , res)=>{
        try {
            const data = await Prod.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus:true, data:data, message:"deleted successfully"})
            


        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
        }


    }
    


    static updateProduct = async (req , res) =>{
        try {
            
            const data = await Prod.findByIdAndUpdate(req.params.id,req.body)
            res.status(200).send({apiStatus:true, data:data, message:"updated successfully"})

        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
            
        }

    }


    static readSingleProduct = async (req,res)=>{
        try {
            
            const data = await Prod.findById(req.params.id);
            res.status(200).send({apiStatus:true, data:data, message:"retrieved successfully"})

        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
            
        }

    }


    static getAllProds =async (req,res) =>{
        try {
            let data
            if(req.query.limit){
            // data = await Prod.find().limit(req.query.limit);
            data = await Prod.find({},null,{limit : req.query.limit});
            }
            else{

                data = await Prod.find();
            }

            res.status(200).send({apiStatus:true, data:data, message:"retrieved successfully"})

        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
            
        }
    }


    
    

    

}


module.exports = prodsContoller