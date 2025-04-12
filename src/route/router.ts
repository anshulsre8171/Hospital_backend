import express from 'express';
import {userRegisterController,userLoginController, ForgetPassswordController, ResetPasswordController, getuserPic,  } from '../Contollers/CommonController/LoginFunctionController';
import { addDepartmentController } from '../Contollers/AdminController/DepartmentController';
export const route=express.Router();

//common route
route.post("/register",userRegisterController)
route.post("/login",userLoginController)
route.post('/forget-password', ForgetPassswordController)
route.post('/reset-password', ResetPasswordController)

route.get('/user/:id/:userType', getuserPic);


//admin route
route.post('/admin-add-department', addDepartmentController);

//doctor route


//patient route
   