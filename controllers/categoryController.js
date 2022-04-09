const mongoose = require('mongoose')
const Category = require('../db/model/categoryModel')

class CategoryContoller {

    static addcategory = async (req,res)=>{
        try {
            const user = req.user;
            req.body.adminID = user._id  
            const product = new Category(req.body);
            await product.save()
            res.status(200).send({apiStatus:true, data:product, message:"added successfully"})

            
        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
            
        }
        

    }



    static getAllCategories = async (req , res)=>{
        try {
            
            const data = await Category.find()
            res.status(200).send({apiStatus:true, data:data, message:"All Categories"})


        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
        }



    }


    static deleteCategory = async (req , res)=>{
        try {
            const data = await Category.findByIdAndDelete(req.params.id)
            res.status(200).send({apiStatus:true, data:data, message:"deleted successfully"})


        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
        }



    }


    static getProdsByCategory =async (req,res) =>{
        try {
            
            const category = "clothes"
            await category.populate('categoryProds')
            res.status(200).send({apiStatus:true, data:category.categoryProds, message:"retrieved successfully"})

        } catch (error) {
            res.status(500).send({apiStatus:false, error:error.message, message:"failed"})
            
        }
    }













}

module.exports = CategoryContoller

