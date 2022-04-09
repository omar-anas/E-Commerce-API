const Category = require("../db/model/categoryModel");
const categoryChecker =  async (req,res,next)=>{
    try {
        
        const allCategoriesObject = await Category.find();
        let CategoriesArray = []
        allCategoriesObject.forEach(element => {
            CategoriesArray.push(element.name)
        });
        const productCategories = req.body.category
        
        const bool = CategoriesArray.includes(productCategories)
        if(!bool)throw new Error("product must be already in category that exists")

        next();
    } catch (error) {
         res.status(500).send({apiStatus:false, data: error.message, message:"product not added because of error"})
        
    }


}

module.exports = categoryChecker