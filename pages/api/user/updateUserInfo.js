import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import User from "../../../Model/Users";
// Check if user is authenticated or not
import { getSession } from "next-auth/react";

const handler = nc();

handler
    .use(async (req, res, next) => {
        console.log("req.body", req.body);

        // init DB
        await dbConnect();

        // init Session
        const session = await getSession({ req });

        console.log("session", session);

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
        // Get the user id from the request
        const { UE, firstName, lastName, username } = req.body;

        const url = req.body.userImage.url;
        const id = req.body.userImage.id;

        //  object for the valid user data to be updated
        const validData = {};

        if (UE) {
            if (firstName) validData.firstName = firstName;
            if (lastName) validData.lastName = lastName;
            if (username) validData.username = username;
            if (url && id) {
                if (validData.userImage) {
                    validData.userImage.url = url;
                    validData.userImage.Img_Id = id;
                } else {
                    validData.userImage = { url: url, Img_Id: id };
                }
            }
        }

        // Update the user data
        if (UE) {
            try {
                await User.findOneAndUpdate({ email: UE }, validData, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                });
                res.status(200).json({ success: true });
            } catch (err) {
                res.status(400).json({ success: false, validData });
            }
        }
    });

export default handler;
