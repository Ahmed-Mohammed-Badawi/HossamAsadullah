import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
// Authentication
import { getSession } from "next-auth/react";
// Model
import Post from "../../../Model/Post";

const handler = nc();
// connect to db
dbConnect();

handler
    .use(async (req, res, next) => {
        // init DB
        await dbConnect();

        // init Session
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }
        // if user is authenticated then go ahead
        next();
    })
    .put(async (req, res) => {
        // extract the mainImage, header, categories, postData, checked from the request
        const {
            postId,
            mainImgURL,
            mainImgID,
            header,
            categories,
            checked,
            savedData,
        } = req.body;

        // make an object of the data that are not null to set it in the database
        const updatedData = {};
        if (mainImgURL && mainImgID) {
            updatedData["mainImage"] = {
                url: mainImgURL,
                public_id: mainImgID,
            };
        }

        if (header) {
            updatedData["header"] = header;
        }

        if (categories) {
            updatedData["category"] = categories;
        }

        if (checked) {
            updatedData["published"] = checked;
        }

        if (savedData) {
            updatedData["postData"] = savedData;
        }

        // update the post in the database
        const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        // if post is not updated then send error
        if (!updatedPost) {
            return res.status(400).json({
                success: false,
                message: "Post not updated",
            });
        }

        // if post is updated then send success
        res.status(200).json({
            success: true,
            message: "Post updated successfully",
        });
    });

export default handler;
