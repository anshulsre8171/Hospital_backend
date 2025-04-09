import express from 'express';
import "reflect-metadata";
import dotenv from 'dotenv';
import { route } from './route/router';
import { AppDataSource } from './DbConfig';
import fileUpload from "express-fileupload"
import cors from 'cors'

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(fileUpload())
AppDataSource.initialize().then(() => {
    console.log(`DataSource initialized !`);
}).catch((err: any) => {
    console.log(err); 
})
app.use("/api",route)////00/test
const PORT = process?.env?.PORT || 9001;
app.listen(PORT, () => {
    console.log(`Hi your server is running on ${PORT} port`); 
})
