import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";
import User from "../../../Model/Users";
import { SendAMB_Reset_Link } from "../../../config/sendInBlue";

const handler = nc();

dbConnect();

handler.post(async (req, res) => {
    // Get the email from the request body
    const { email } = req.body;

    // Check if the email is valid
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Please provide an email",
        });
    }

    // Check if the email is valid (regex)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email",
        });
    }

    // Check if the user exists
    const user = await User.findOne({ email, confirmed: true });

    // Check if the user exists
    if (!user) {
        return res.status(400).json({
            success: false,
            message:
                "There is no user with this email or the user is not confirmed",
        });
    }

    // reset password token function
    const resetPasswordToken = () => {
        // Generate a random string
        const randomString = Math.random().toString(36).slice(-8);
        // Return the random string
        return randomString;
    };

    // Generate a reset password token
    const resetPasswordTokenGenerated = resetPasswordToken();

    // Add the Id of the user to the reset password token
    const resetPasswordTokenWithId =
        resetPasswordTokenGenerated +
        "UIUIUI" +
        user._id +
        "UI" +
        resetPasswordTokenGenerated +
        "UIUI" +
        resetPasswordTokenGenerated;

        // Merge the reset password token with the website url from the request to create a reset password link
        const resetPasswordLink = `${req.headers.origin}/authentication/resetPassword_p2?token=${resetPasswordTokenWithId}`;

    if (user.resetPasswordTries >= 5 && user.resetPasswordTokenPendingTime === null) {
        // add a pending time to the user for 1`hour
        user.resetPasswordTokenPendingTime = Date.now() + 3600000;
        // save the user
        await user.save();
        // return a message
        return res.status(400).json({
            success: false,
            message:
                "You have reached the maximum number of tries, please try again in 1 hour",
        });
    }

    // Check if the user has a pending time
    if (user.resetPasswordTokenPendingTime) {
        // Check if the pending time is greater than the current time
        if (user.resetPasswordTokenPendingTime > Date.now()) {
            // return a message
            return res.status(400).json({
                success: false,
                message: "Please try again in 1 hour",
            });
        }else{
            // remove the pending time
            user.resetPasswordTokenPendingTime = null;
            user.resetPasswordTries = 0;
            // save the user
            await user.save();
        }
    }

    try {
        console.log("BEFORE UPDATE");
        // Update the user with the reset password token and the reset password token expiration date for 1 hour
        await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: resetPasswordTokenWithId,
            resetPasswordExpires: Date.now() + 3600000,
            resetPasswordTries: user.resetPasswordTries + 1,
        });
        
        console.log("BEFORE SEND EMAIL");
        // Send the reset password link to the user
        await SendAMB_Reset_Link(
            user.email,
            user.firstName,
            user.lastName,
            resetPasswordLink
        );
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again",
        });
    }

    // return a message
    res.status(200).json({
        success: true,
        message: "Reset password link sent to your email",
    });
});

export default handler;
