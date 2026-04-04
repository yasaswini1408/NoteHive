const User=require("../models/userModel")
const bcrypt=require('bcryptjs')

//signup
exports.signup= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email ||!password){
            return res.status(400).send("Please enter all the required fields")
        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).send("User already exists with this email")
        }
        
        const hashedPassword=await bcrypt.hash(password,12)
        const newUser=new User({
            name,
            email,
            password:hashedPassword
        })
        const savedUser=await newUser.save()
        res.json(savedUser)
    }catch(err){
        console.log(err)
        res.status(500).send("Signup error")
    }
}