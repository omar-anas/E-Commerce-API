const router = require('express').Router()
const prodsContoller = require('../controllers/productController');
const UserController  = require('../controllers/userController');
const CategoryContoller  = require('../controllers/categoryController');
const categoryChecker = require('../middleware/productMustInCategory')
const authAdmin = require('../middleware/authAdmin.middleware')

console.log(authAdmin)
//Login
router.post('/login',UserController.loginAdmins)
//ADD PRODUCT
router.post('/addProduct',authAdmin,categoryChecker,prodsContoller.addProduct)
//UPDATE PRODUCT
router.patch('/updateProduct/:id',authAdmin,prodsContoller.updateProduct)
//DELETE PRODUCT
router.delete('/deleteProduct/:id',authAdmin,prodsContoller.deleteProduct)
//SHOW 1 PRODUCT
router.get('/readSingleProduct/:id',authAdmin,prodsContoller.readSingleProduct)
//SHOW ALL PRODUCTS IN GENERAL
router.get('/getAllProds',authAdmin,prodsContoller.getAllProds);
//SHOW ALL PRODUCTS SPECIFIC ADMIN ADDED
router.get('/showAllProds',authAdmin,prodsContoller.readAllProdsAdminAdded)






//ADD CATEGORY
router.post('/addCategory',authAdmin,CategoryContoller.addcategory)
//SHOW ALL CATEGORIS
router.get('/showAllCategories',authAdmin,CategoryContoller.getAllCategories)
//DELETE CATEGORY
router.delete('/deleteCategory/:id',authAdmin,CategoryContoller.deleteCategory)


router.get('/getProdsByCategory',authAdmin,CategoryContoller.getProdsByCategory)


module.exports = router

