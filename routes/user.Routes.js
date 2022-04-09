const router = require('express').Router()
const UserController = require('../controllers/userController');
const authUser = require('../middleware/authUser.middleware')
const prodsContoller = require('../controllers/productController')
const upload = require('../middleware/fileUpload');

//REGISTER NEW USER
router.post('/register',UserController.register)
//GET MY PROFILE
router.get('/me',authUser,UserController.profile)
//LOGIN MY ACCOUNT
router.post('/login',UserController.loginUsers)
//order Proceed Cart
router.post('/order/:id',authUser,UserController.order)
//show all Orders
router.get('/allOrders',authUser,UserController.showOrders)
//LOGOUT MY ACCOUNT
router.post('/logout',authUser,UserController.logout)
//LOGOUT MY ACCOUNT FROM ALL DEVICES
router.post('/logoutAll',authUser,UserController.logoutAll)
//DELETE MY ACCOUNT
router.post('/delete',authUser,UserController.deleteMe)

//ADD ITEM TO CART
router.post('/addToCart/:id',authUser,UserController.addToCart)
//REMOVE FROM CART
router.post('/removeFromCart/:id',authUser,UserController.removeFromCart)
//SHOW FROM CART
router.get('/showMyCart',authUser,UserController.showMyCart)


//SHOW 1 PRODUCT
router.get('/readSingleProduct/:id',authUser,prodsContoller.readSingleProduct)
//SHOW ALL PRODUCTS IN GENERAL
router.get('/getAllProds',prodsContoller.getAllProds);


router.post('/addImg',authUser, upload.single("img"),UserController.addImg)
router.post("/addimage", authUser, upload.single("img"), UserController.addImage);


module.exports = router
