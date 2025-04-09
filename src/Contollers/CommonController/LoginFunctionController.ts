import { createResponse } from "../../Helpers/createResponse";
import { returnUserType } from "../../Helpers/returnUserType";
import path from "path";
import { uploadFileHelper } from "../../Helpers/uploadFileHelper";
import jsonwebtoken from 'jsonwebtoken';
import { createRandomString, sendForgetPasswordMail } from "../../Helpers/SendMailForgetpassword";


export const userRegisterController = async (req: any, res: any) => {
    try {
        const dataToSave = req.body;
        let { profile } = req.files;
        console.log(dataToSave);

        const pathToSaveFile = path.join(__dirname, '../../uploads/');
        const profileName = uploadFileHelper(profile, pathToSaveFile, res);
        const finalData: any = { ...dataToSave, profile: profileName };
        // console.log(finalData);
        
        const TblName: any = await returnUserType(dataToSave?.userType);
        // console.log(TblName);
        
        const isExist = await TblName.findOne({ where: { email: dataToSave?.email } });
        // console.log(isExist);
        if (isExist) {
            return createResponse(res, 208, "User Already Exist !", isExist, false, true)
        } else {
            const result = await TblName.save(finalData);
            // console.log(result);
            if (result){
                return createResponse(res, 201, "User register successfully !", result, true, false)
            }else{
                return createResponse(res, 404, "User register failed !", result, false, true)
            }
        }
  
    } catch (err) {
        if (err) {
            // console.log(err);
            createResponse(res, 500, "Internal Server Error",err, false, true);
        }
    }
}


export const userLoginController = async (req: any, res: any) => {
    try {
        const { email, password, userType } = req.body;
        const tableName: any = await returnUserType(userType)
        const result = await tableName.findOne({ where: { email, password } });
        const jwtToken = await jsonwebtoken.sign({ id: result?.id, email: result?.email }, `${process.env.JWTSECRET}`, { expiresIn: '2h' })
        const finalResult = { ...result, jwtToken }
        if (result) {
            return createResponse(res, 200, "Login success", finalResult, true, false)
        } else {
            return createResponse(res, 404, "Login FIALED!", [], false, true)
        }
    } catch (err: any) {
        return createResponse(res, 500, "Internal Server Error!", err, false, true)
    }
}


export const ForgetPassswordController=async(req:any,res:any)=>{
    const {email, userType} =req.body;
    const TblName: any = await returnUserType(userType); 
    const isExist=await TblName.findOne({where:{email}})

       if(isExist){ 
        const token= createRandomString(); 
        await TblName.update({email:email},{ token})
        await  sendForgetPasswordMail(email,token,userType)
         return   createResponse(res, 200, "Mail send Successfull !",[], true, false);
     }else{
      return   createResponse(res, 404, "User Not Found!",[], false, true);
  }
  }


  export const ResetPasswordController=async(req:any,res:any)=>{
    const{ password,token,userType}=req.body
    const TblName: any = await returnUserType(userType); 
    const isTokenNotExpire=await TblName.findOne({where:{token}})
    if(isTokenNotExpire){
         const TokenGenTime:any=new Date(isTokenNotExpire.updatedAt.getTime())
         const curentTime=Date.now()
         const expTime=30000000
         if(curentTime-TokenGenTime>=expTime){
            return   createResponse(res, 200, "Link has been Expires!",[], false, true);
         }else{
            await TblName.update({token},)
            return   createResponse(res, 200, "Password successfully updated!",[], false, true);
         }
    }else{
      return   createResponse(res, 200, "Token has been Expires!",[], false, true);
    }
  }