import express from 'express';
import {userRegisterController,userLoginController } from '../Contollers/CommonController/LoginFunctionController';
export const route=express.Router();

//common route
route.post("/register",userRegisterController)
route.post("/login",userLoginController)


//admin route


//doctor route


//patient route
   