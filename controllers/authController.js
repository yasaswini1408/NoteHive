const User=require("../models/userModel")
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken')

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

//login
exports.login= async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).send("Please enter all the required fields")
        }
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(400).send("User not found with this email")
        }   
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect){
            return res.status(400).send("Invalid credentials")
        }
        const token=jwt.sign(
            {userId:existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        res.json({token})
    }catch(err){
        console.log(err)
        res.status(500).send("Login error")
    }   
}
