import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"


export const handleRegister= async(req, res) => {
    try{
        const data=req.body
        const user= await User.findOne({
            email: data.email
        })

        if (user){
            res.status(400).json({
                message: "User already exist, Please login"
            })
            
        }
        const newUser= User.create(data)
        
        return res.json({
            message: "Register Success, Please login",
            data: newUser
        })

    } catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
    
}

export const handleLogin= async (req, res) =>{
    try{
        const data=req.body
        const user= await User.findOne({
            email: data.email,
            password: data.password
        })

        if (!user){
            res.status(400).json({
                message: "Incorrect email or password"
            })
            
        }
        const token = jwt.sign({ id:user.id}, process.env.JWT_SECRET, {
            expiresIn: "2d"
        })

        return res.json({
            message: "Login Success !!!",
            data: {token}
        })

    } catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
} 

export const handleGetMe=(req, res)=> {
    const user=req.user

    res.json({
        message:"Hii!!!",
        data:user
    })
}
