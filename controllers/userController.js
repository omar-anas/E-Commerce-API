const mongoose = require('mongoose');
const Order = require('../db/model/orders');
const User = require('../db/model/usersModel')



class UserController {

    static register= async (req , res)=>{
        try {
            let user = new User(req.body);
           const token =await user.generateToken();

        //    if(!req.file) throw new Error ("file not found")
        //     user.image = req.file.path.replaceAll("\\", "/")    // \\  /
            
            res.send({apiStatus:true , message:"registerd" , data:{user,token}})
        } catch (error) {
            res.status(500).send({apiStatus:false , message:error.message })
        }
    }

    static profile =async ( req , res)=>{
        const userData = req.user;
        res.status(200).send({apiStatus:true, data:userData, message:"profile"})
    }

    static loginUsers =async ( req , res)=>{
        try {
            console.log(req.body.email);
            console.log(req.body.password);
            const user = await User.loginUser(req.body.email,req.body.password)
            const token = await user.generateToken()
            res.status(200).send({apiStatus:true, data:{user,token}, message:"logged in success"})
            
            
        } catch (e) {
            res.status(500).send({apiStatus: false, data:e.message, message:"invalid login"})
        }
    }

    static loginAdmins =async ( req , res)=>{
        try {
            const user = await User.loginAdmin(req.body.email,req.body.password)
            const token = await user.generateToken()
            res.status(200).send({apiStatus:true, data:{user,token}, message:"logged in success"})
            
            
        } catch (e) {
            res.status(500).send({apiStatus: false, data:e.message, message:"invalid login"})
        }
    }



    static deleteMe =async (req,res)=>{
        try{

            const user = req.user
            console.log(user._id)
            await User.findByIdAndDelete(user._id)
            res.status(200).send({apiStatus:true, data:user, message:"success delete"})

        }
        catch (error) {
            res.status(500).send({apiStatus: false, data:error.message, message:"failed delete"})
        }



    }

    static logoutAll =async (req,res)=>{
        try{
            const user = req.user
            user.tokens = []
            await user.save()
            res.status(200).send({apiStatus:true, data:user, message:"success logout"})


        }catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"failed logout"})
        }

    }

    static addToCart =async (req,res)=>{
        try{
            
            await req.user.cart.push(req.params.id)
            await req.user.save();
            res.status(200).send({apiStatus:true, data:req.user.cart, message:"added successfully"})


        }catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"failed"})   
        }

    }

    static logout =async (req,res) =>{
        try{
        
        req.user.tokens =await req.user.tokens.filter((tokens)=>tokens.token !=req.token)
        await req.user.save()
        res.status(200).send({apiStatus:true, data:req.user, message:"logged out successfully"})


        }catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"failed"})   
        }

    }







    
    static showMyCart =async (req,res) =>{
        try{
        
        await req.user.populate("myProducts")
        res.status(200).send({apiStatus:true, data:req.user.myProducts, message:"items retrived from cart successfully"})


        }catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"failed"})   
        }

    }


    static order = async(req,res)=>{
        try {

            // const order = new Order({userID:req.user._id,productID:req.params.id})
            await req.user.orders.push(req.params.id)
            await req.user.save(); 
            res.status(200).send({apiStatus:true, data:req.user.orders, message:"items is ordered"})
            
        } catch (error) {
            res.status(500).send({apiStatus: false, data:error.message, message:"failed"})   
            
        }
    }

    static showOrders = async(req,res) =>{
        try {
            
            // const order = await Order.find({})
            // await order.populate('myOrders')
            // console.log(order.myOrders);

           await req.user.populate("myOrders")
            
            res.status(200).send({apiStatus:true, data:req.user.myOrders, message:"items is ordered"})
            
        } catch (error) {
            res.status(500).send({apiStatus: false, data:error.message, message:"failed"})   
            
        }

    }


    static removeFromCart =async (req,res) =>{
        try{
        
        req.user.cart = await req.user.cart.filter(ele=>ele!=req.params.id)
        await req.user.save()
        res.status(200).send({apiStatus:true, data:req.user, message:"item removed from cart successfully"})


        }catch(e){
            res.status(500).send({apiStatus: false, data:e.message, message:"failed"})   
        }

    }


    static addImg = async(req, res)=>{
        try{
            if(!req.file) throw new Error ("file not found")
            req.user.image = req.file.path //.replaceAll("\\", "/")    // \\  /
            await req.user.save()
            res.status(200).send({apiStatus:true, data: req.user, message:"profile image updated"})
        }
        catch(e){
            res.status(500).send({ apiStatus:false, data:e.message, message:"error add image" })
        }
    }
    static addImage = async (req, res) => {
        try {
          req.user.image = req.file.path;
          await req.user.save();
          res.status(200).send({
            apiStatus: true,
            data: req.user,
            message: " image added successfuly",
          });
        } catch (e) {
          res.status(500).send({
            apiStatus: false,
            data: e.message,
            message: "error adding image",
          });
        }
    };



}

module.exports = UserController