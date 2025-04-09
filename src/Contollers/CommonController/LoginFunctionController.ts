import { createResponse } from "../../Helpers/createResponse";




export const userRegisterController = async (req: any, res: any) => {
    try {
        const dataToSave = req.body;
        let { profile } = req.files;
        console.log(dataToSave);
  
    } catch (err) {
        if (err) {
            // console.log(err);
            createResponse(res, 500, "Internal Server Error",err, false, true);
        }
    }
}




