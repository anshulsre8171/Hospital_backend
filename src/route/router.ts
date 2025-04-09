import express from 'express';
import {userRegisterController,userLoginController, ForgetPassswordController } from '../Contollers/CommonController/LoginFunctionController';
export const route=express.Router();

//common route
route.post("/register",userRegisterController)
route.post("/login",userLoginController)
route.post('/forget-password', ForgetPassswordController)


//admin route


//doctor route


//patient route
   