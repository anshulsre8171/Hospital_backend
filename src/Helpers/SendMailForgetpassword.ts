import nodemailer from 'nodemailer';
 
 export const sendForgetPasswordMail = async (email: any,token:any,TblName:any) => {  
     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
             user: process?.env?.EMAIL_USER,// EMAIL_USER
             pass:process?.env?.EMAIL_PASSWORD  //EMAIL_PASSWORD
         }
     }); 

     var mailOptions = {
         from: process?.env?.EMAIL_USER ,
         to: email,
         subject: 'Forget password',
         html: `Click the link to reset your password <a href='${process?.env?.UI_BASE_URL}?token=${token}&Type=${TblName}'>click</a>`
     };
 
     transporter.sendMail(mailOptions, (error, info)=> {
         if (error) {
             console.log(error);
         } else {
             console.log('Email sent: ' + info.response);
         }
     }); 
 }
 
 export const createRandomString=(length=25) =>{
     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     let result = "";
     for (let i = 0; i < length; i++) {
       result += chars.charAt(Math.floor(Math.random() * chars.length));
     }
     return result;
   }