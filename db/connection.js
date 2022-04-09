const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.DB_URL,{})
    
} catch (error) {
    console.log(error);
}