import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';

// Change Password Helper
import { changePassword } from '../../../helpers/changePassword';

const handler = nc();
dbConnect();

handler.put(changePassword);

export default handler;
