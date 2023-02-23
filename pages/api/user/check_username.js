import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import User from "../../../Model/Users";

const handler = nc();

handler.get(async (req, res) => {
    await dbConnect();

    const { username } = req.query;

    // Check if the username is already taken or not by searching for it in the database
    const user = await User.findOne({ username: username });

    // If the user is found, return an error
    if (user) {
        res.status(200).json({ isValid: false });
    } else {
        res.status(200).json({ isValid: true });
    }
});

export default handler;
