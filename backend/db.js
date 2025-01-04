const mongoose = require("mongoose") // Importing mongoose


mongoose.connect("mongodb+srv://Admin:stOzO5Pt1kK5OAez@cluster0.3vccn.mongodb.net/paytm")
// Connecting to the database


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
});

const accountSchema = mongoose.Schema({
    userId:String,
    balance:{
        type:Number,
        required:true,
    },
});

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema); 

module.exports = {
    User,
    Account
}