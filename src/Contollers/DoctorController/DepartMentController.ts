import { AppointmentTblGen } from "../../Entities/AppointmentTblGen";
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

export const getDoctorSchedule=async(req:any,res:any)=> {
    const {doctorId}=req.query
    const result = await AppointmentTblGen.createQueryBuilder('appointment')
      .select(['appointment.day', 'appointment.time','appointment.createdAt'])
      .where('appointment.doctorId = :doctorId', { doctorId })
      .distinct(true)
      .orderBy('appointment.day', 'ASC')
      .addOrderBy('appointment.time', 'ASC')
      .getRawMany();
  
      return createResponse(res, 200, "Doctor Details fetched successfully !", result, true, false) // [{ appointment_day: 'Sunday', appointment_time: '11:00' }, ...]
  }