const jwt = require("jsonwebtoken")
const User = require("../db/model/usersModel")
const authAdmin = async(req, res, next) =>{
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = await jwt.verify(token, process.env.JWTTOKEN);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user) throw new Error('unauthorized')
        if(!user.usertype == 'admin') throw new Error('unauthorized')
        req.user = user
        req.token=token
        // res.send(req.user)
        next()
    }
    catch(e){ res.status(500).send({apiStatus:false, data: e, message:"unauthorized"})}
}
module.exports = authAdmin