import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const requireAuth= async(req,res,next)=> {
    try{
        const auth=req.headers.authorization
        if (!auth){
            return res.status(400).json({
                message:"Please login"
            })
        }
            // auth=bearer space

        const token=auth.split(" ")[1]
        if(!token){
            return res.status(400).json({
                message: "Please Login"
            })
        }
        const decoded=jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded.id){
            res.status(400).json({
                message:"Please Login"
            })
        }
        const user= await User.findById(decoded.id)
        if(!user){
            return res.status(400).json({
                message:"Please Login"
            })
        }
        req.user=user
        next()
        

    }catch(error){
        return res.status(500).json({
            message: "Server error !"
        })
    }
}