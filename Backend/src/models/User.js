const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
{
    name :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    
    password :{
        type : String,
        required : true,
        minlength : 8
    },
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    },
    // reset password token and expiry for password reset functionality
   resetotphash :{
    type : String,
    default : null
   },
    resetotpexpiry :{
        type : Date,
        default : null
    },
    resetAttempt:{
        type : Number,
        default : 0
    }
},
 {timestamps : true}

);

module.exports = mongoose.model('User', userSchema);