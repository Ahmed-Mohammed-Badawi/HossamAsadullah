import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import create_post from '../../../helpers/create_post';

//Create the Handler
const handler = nc();
//Connect to Database
dbConnect();
// the Post Function
handler.post(create_post);


export default handler;