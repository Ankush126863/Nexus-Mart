import  JWT  from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async(req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing",
            });
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;
        
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }  catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
}

//admin access
export const isAdmin = async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        //If Not Admin
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access'
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in Admin Middleware"
        })
    }
}