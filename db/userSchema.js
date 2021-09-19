import mongoose from 'mongoose'

// defining schema
const userSchema=mongoose.Schema({
    id:String,
    name: String,
    role: String,
    mobileNumber: String,
    emailId: String,
    password:String
});

export default mongoose.model('users',userSchema)