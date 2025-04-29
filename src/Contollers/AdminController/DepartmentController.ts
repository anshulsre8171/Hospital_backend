import { AppointmentTbl } from "../../Entities/AppointmentTbl";
import { AppointmentTblGen } from "../../Entities/AppointmentTblGen";
import { Department } from "../../Entities/DepartmentTbl"; 
import { Doctor } from "../../Entities/DoctorTbl";
import { Patient } from "../../Entities/PatientTbl";
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

    
export const getAppByAdmin = async (req: any, res: any) => {
  
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
    // .where('apptbl.doctorId=:doctorId',{doctorId:doctorId})
    // .orWhere()
    // .limit(1)
    // .offset(2)
    // .orderBy('apptbl.createdAt',"ASC")
    // .addOrderBy
  const result = await queryBuilder.getRawMany()


  res.send(result)
};

export const getAppGenByAdmin = async (req: any, res: any) => {
  
  const queryBuilder = AppointmentTblGen.createQueryBuilder('appgentbl')
    .select([
      "patient.name","patient.email",  "patient.profile", "patient.gender", "patient.age","patient.bloodGroup", //Patient ka data nikal rhe hai
      "department.name", "department.name",//Department ka data nikal rhe hai
      "doctor.name", "doctor.fees", "doctor.profile", "doctor.specialist",
      "appgentbl.id", "appgentbl.disease", "appgentbl.status", "appgentbl.appointmentType", "appgentbl.day", "appgentbl.time", "appgentbl.payment", "appgentbl.createdAt"
    ])
    .leftJoin(Patient, "patient", `appgentbl.patientId=patient.id::varchar`)
    .leftJoin(Department, "department", `appgentbl.departmentId=department.id::varchar`)
    .leftJoin(Doctor, "doctor", `appgentbl.doctorId=doctor.id::varchar`)
  const result = await queryBuilder.getRawMany()
  res.send(result)
};