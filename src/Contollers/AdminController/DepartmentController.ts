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