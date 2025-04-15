import express from 'express';
import {userRegisterController,userLoginController, ForgetPassswordController, ResetPasswordController, getuserPic,  } from '../Contollers/CommonController/LoginFunctionController';
import { addDepartmentController, getDepartmentController } from '../Contollers/AdminController/DepartmentController';
import { verifyToken } from '../middleware/Verifytoken';
import { getDoctorBydepartmentIdController } from '../Contollers/DoctorController/DepartMentController';
import { addapController,  } from '../Contollers/PatientController/BookAppointmentController';
export const route=express.Router();

//common route
route.post("/register",userRegisterController)
route.post("/login",userLoginController)
route.post('/forget-password', ForgetPassswordController)
route.post('/reset-password', ResetPasswordController)

route.get('/user/:id/:userType', getuserPic);


//admin route
route.post('/admin-add-department',verifyToken, addDepartmentController);
route.get('/admin-get-department',getDepartmentController);



//doctor route
route.get('/get-doctor-by-departmentId',verifyToken, getDoctorBydepartmentIdController);


//patient route
route.post('/doctor-appointment-book',verifyToken, addapController);
// route.get('/get-appointment-by-patient',verifyToken, GetaddapByPatientController);  