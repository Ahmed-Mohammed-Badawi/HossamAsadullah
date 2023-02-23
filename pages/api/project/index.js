import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import {getProjectsNumbers} from "../../../helpers/getDashboardData";

const handler = nc();

dbConnect()

handler.get(getProjectsNumbers);

export default handler;