import { Department } from "../../Entities/DepartmentTbl"; 
import { createResponse } from "../../Helpers/createResponse";


export const addDepartmentController = async (req: any, res: any) => {
  const { name}:any=req.body; 
  const isExist=await Department.findOne({where:{name}})             
  if(isExist == name){
   return createResponse(res, 200, "Department Already exist !", isExist, false, true)
  }else{
   const result=await  Department.save({name});
   return createResponse(res, 201, "Department created successfully", result, false, true)
  }
  
}

export const getDepartmentController = async (req: any, res: any) => {  
    try{
      const result=await Department.find()             
      if(result?.length>0){
       return createResponse(res, 200, "Department fetched successfully !", result, true, false)
      }else{
        return createResponse(res, 404, "Department not found", result, false, true)
      } 
    }catch(err:any){
      return createResponse(res, 500, "Internal server error", [], false, true)
    }
    }