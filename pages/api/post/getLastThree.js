import nc from 'next-connect';
import dbConnect from "../../../config/dbConnect";
import { getPostsAndProjects } from '../../../helpers/getHomePageData';

dbConnect();

const handler = nc();

handler.get(getPostsAndProjects);

export default handler;