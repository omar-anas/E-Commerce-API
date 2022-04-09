const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const ObjectId = mongoose.Schema.Types.ObjectId;

const userschema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 20,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("invalid email")
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female"]
    },
    image: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 18
    },
    phone: {
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid phone number")
        }
    },
    
    address:{

        country: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        }
    },

    usertype: {
        type: String,
        trim: true,
        required: true,
        enum: ['admin', 'user']
    },
    tokens: [{ token: { type: String, required: true } }],
    cart: [{ type: ObjectId, ref: "Product" }],
    orders: [{ type: ObjectId, ref: "Product" }]
    
},
    { timestamps: true }
)

userschema.virtual('myProducts', {
    ref: "Product",
    localField: "cart",
    foreignField: "_id"
})


userschema.virtual('myOrders', {
    ref: "Product",
    localField: "orders",
    foreignField: "_id"
})

userschema.virtual('Admin_Products', {
    ref: "Product",
    localField: "_id",
    foreignField: "adminID"
})


userschema.pre('save', async function () {
    let user = this
    if (user.isModified("password")) user.password = await bcrypt.hash(user.password, 8)
})

userschema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.password
    delete data.__v
    delete data.tokens
    return data
}

userschema.statics.loginUser = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("email not found")
    if (!(user.usertype == 'user')) throw new Error("you must login as a user")
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) throw new Error("invalid password")
    return user
}

userschema.statics.loginAdmin = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error("email not found")
    if (!(user.usertype == 'admin')) throw new Error("you must login as a admin")
    const isValidPass = await bcrypt.compare(password, user.password)
    if (!isValidPass) throw new Error("invalid password")
    return user
}

userschema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWTTOKEN)
    user.tokens.push({ token })
    await user.save()
    // user.tokens = user.tokens.concat({token})
    return token
}

const User = mongoose.model("User", userschema);
module.exports = User


