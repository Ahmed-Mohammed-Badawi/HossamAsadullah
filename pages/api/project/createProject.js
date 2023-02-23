import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import create_project from "../../../helpers/create_project";

//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the Post Function
handler.post(create_project);


export default handler;