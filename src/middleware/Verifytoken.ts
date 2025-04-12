import jwt from 'jsonwebtoken'
import { createResponse } from '../Helpers/createResponse';

export const verifyToken=async(req:any,res:any,next:any)=>{
    const token=req?.headers?.authorization?.split(" ")[1];
    await jwt.verify(token,`${process.env.JWTSECRET}`,(err:any,decode:any)=>{
        if(err){
            createResponse(res,401,"Invalid token!",[] ,false,true)
        }
        else{
            req.user=decode
            next()
        }
    })
}
 