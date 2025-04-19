import { Doctor } from "../../Entities/DoctorTbl"
import { createResponse } from "../../Helpers/createResponse"

export const getDoctorBydepartmentIdController = async (req: any, res: any) => {
    try {
        const { departmentId } = req.query;
        const result = await Doctor.find({ where: { departmentId: departmentId } })
        if (result?.length>0) {
            return createResponse(res, 200, "Doctor fetched successfully !", result, true, false)
        } else {
            return createResponse(res, 404, "Doctor not found", result, false, true)
        }
    } catch (err: any) {
        return createResponse(res, 500, "Internal server error", [], false, true)
    }  ///dfgfd
}

export const getDoctorDaytimeBydoctorIdController =async(req:any,res:any)=>{
    try{
        const {doctorId}=req.query
        const result=await Doctor.find({where:{id:doctorId}})
        if (result?.length>0) {
            return createResponse(res, 200, "Doctor Details fetched successfully !", result, true, false)
        } else {
            return createResponse(res, 404, "Doctor not found", result, false, true)
        }
    }catch(error:any){
        return createResponse(res, 500, "Internal server error", [], false, true)
    }
}