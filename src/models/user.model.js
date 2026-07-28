import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

},{
    timestamps:true
})



userSchema.pre('save' , async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password ,10)
    next(); 
})

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword , this.password)

}

const  userModel = mongoose.model('User',userSchema)

export default userModel 