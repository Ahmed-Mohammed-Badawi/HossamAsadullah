import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import {getBlogPostsNumbers} from "../../../helpers/getDashboardData";

const handler = nc();

dbConnect()

handler.get(getBlogPostsNumbers);

export default handler;