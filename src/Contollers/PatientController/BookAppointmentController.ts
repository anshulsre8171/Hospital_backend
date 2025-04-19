import moment from "moment";
 import { Doctor } from "../../Entities/DoctorTbl";
 import { AppointmentTbl } from "../../Entities/AppointmentTbl";
 import { createResponse } from "../../Helpers/createResponse";
import { Patient } from "../../Entities/PatientTbl";
import { Department } from "../../Entities/DepartmentTbl";
import { AppointmentTblGen } from "../../Entities/AppointmentTblGen";
 
 export const addapController = async (req: any, res: any) => {
   try {
     const { patientId, departmentId, doctorId, disease, symptoms, payment, status, appointmentType, date, startTime, } = req.body;
     if (!patientId || !doctorId || !date || !startTime) {  // make sure to don't miss these fields
       // return res.status(400).json({ message: "Missing required fields" });
       return createResponse(res, 400, "Missing required fields", [], false, true)
     }
     const doctor = await Doctor.findOne({ where: { id: doctorId } }); // find the doctor 
     if (!doctor) {
       // return res.status(404).json({ message: "Doctor not found" });
       return createResponse(res, 404, "Doctor not found", [], false, true)
     }

     const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });   // get day of given date "2025-04-11" -> "friday"
     if (!doctor.availableDays || !doctor.availableDays.includes(dayName)) {    // check availability of doctor at that day 
       // return res.status(400).json({ message: `Doctor is not available on ${dayName}` });
       return createResponse(res, 400, `Doctor is not available on ${dayName}`, [], false, true)
     }

     const appointmentStart = moment(`${date} ${startTime}`, "YYYY-MM-DD HH:mm");  // create a timestamp by using moment package "2025-04-11 10:10"
     const appointmentEnd = moment(appointmentStart).add(1, 'hour');  // Busy time of doctor
     const existingAppointments = await AppointmentTbl.find({ where: { doctorId, date, }, }); // check database for existing appointments
 
     // Check for any overlapping time and get the conflicting slot
     const overlappingAppointment = existingAppointments.find((appt) => {
       const apptStart = moment(`${appt.date} ${moment(appt.startTime).format("HH:mm")}`, "YYYY-MM-DD HH:mm");
       const apptEnd = moment(apptStart).add(1, 'hour');

       return appointmentStart.isBefore(apptEnd) && appointmentEnd.isAfter(apptStart); // can not available between start time and end time 
     });
 
     if (overlappingAppointment) {
       const apptStart = moment(`${overlappingAppointment.date} ${moment(overlappingAppointment.startTime).format("HH:mm")}`, "YYYY-MM-DD HH:mm");

       const apptEndFormatted = apptStart.add(59, 'minutes').format("hh:mm A");  // used to get the max time to display only 
 
       // return res.status(409).json({
       //   message: `Doctor already has an appointment. Try after ${apptEndFormatted}`,
       // });

       return createResponse(res, 409, `Doctor already has an appointment. Try after ${apptEndFormatted}`, [], false, true) 
     }
     // Create new appointment
     const newAppointment = new AppointmentTbl();
     newAppointment.patientId = patientId;
     newAppointment.departmentId = departmentId;
     newAppointment.doctorId = doctorId;
     newAppointment.disease = disease;
     newAppointment.symptoms = symptoms;
     newAppointment.payment = payment;
     newAppointment.status = status;
     newAppointment.appointmentType = appointmentType;
     newAppointment.date = date;
     newAppointment.startTime = appointmentStart.toDate(); // store as full Date object
 
     await newAppointment.save();
 
     // return res.status(201).json({
     //   message: "Appointment created successfully",
     //   data: newAppointment,
     // });
     return createResponse(res, 201, "Appointment created successfully", newAppointment, true, false)
   } catch (error) {
     console.error("Error in addapController:", error);
     return res.status(500).json({ message: "Internal server error" });
   }
 };
 
 export const addapGenController = async (req: any, res: any) => {
  try {
    const { patientId, departmentId, doctorId, disease,lastVisiting,contact,gender,daysFeel,day,time,fees , payment, status} = req.body;
    if (!patientId || !doctorId || !day || !time) {  // make sure to don't miss these fields
      return createResponse(res, 400, "Missing required fields", [], false, true)
    }
    const doctor = await Doctor.findOne({ where: { id: doctorId } }); // find the doctor 
    if (!doctor) {
     return createResponse(res, 404, "Doctor not found", [], false, true)
     }

    const days= await AppointmentTblGen.findOne({where:{day:day}}) //find day
    const times=await AppointmentTblGen.findOne({where:{time:time}})
    if(days && times){
      return createResponse(res, 404, "This sloat is already booked", [], false, true)
    }

    // Create new appointment
    const newAppointment = new AppointmentTblGen();
    newAppointment.patientId = patientId;
    newAppointment.departmentId = departmentId;
    newAppointment.doctorId = doctorId;
    newAppointment.disease = disease;
    newAppointment.gender = gender; 
    newAppointment.contact = contact;
    newAppointment.daysFeel = daysFeel;
    newAppointment.lastVisiting = lastVisiting;
    newAppointment.day = day;
    newAppointment.time= time;
    newAppointment.fees = fees;
    newAppointment.day = day;
    newAppointment.payment = payment;
    newAppointment.status = status;
    await newAppointment.save();

    return createResponse(res, 201, "Appointment created successfully", true, false)
  } catch (error) {
    console.error("Error in addapController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

