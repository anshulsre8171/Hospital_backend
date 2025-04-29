import { AppointmentTbl } from "../../Entities/AppointmentTbl";
import { AppointmentTblGen } from "../../Entities/AppointmentTblGen";
import { Department } from "../../Entities/DepartmentTbl";
import { Doctor } from "../../Entities/DoctorTbl"
import { Patient } from "../../Entities/PatientTbl";
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

  export const getAppoinmentByDoctor = async (req: any, res: any) => {
    const {doctorId}=req.query;
    const queryBuilder = AppointmentTbl.createQueryBuilder('apptbl')
      .select([
        "patient.name","patient.email",  "patient.profile", "patient.gender", "patient.age","patient.bloodGroup", //Patient ka data nikal rhe hai
        "department.name", "department.name",//Department ka data nikal rhe hai
        "doctor.name", "doctor.fees", "doctor.profile", "doctor.specialist",
        "apptbl.id", "apptbl.disease", "apptbl.symptoms", "apptbl.status", "apptbl.appointmentType", "apptbl.date", "apptbl.startTime", "apptbl.payment", "apptbl.createdAt"
      ])
      .leftJoin(Patient, "patient", `apptbl.patientId=patient.id::varchar`)
      .leftJoin(Department, "department", `apptbl.departmentId=department.id::varchar`)
      .leftJoin(Doctor, "doctor", `apptbl.doctorId=doctor.id::varchar`)
      .where('apptbl.doctorId=:doctorId',{doctorId})
      // .orWhere()
      // .limit(1)
      // .offset(2)
      // .orderBy('apptbl.createdAt',"ASC")
      // .addOrderBy
    const result = await queryBuilder.getRawMany()
  
  
    res.send(result)
  };
