import express from 'express';
import {userRegisterController } from '../Contollers/CommonController/LoginFunctionController';
export const route=express.Router();

//common route
route.post("/register",userRegisterController)


//admin route


//doctor route


//patient route
   