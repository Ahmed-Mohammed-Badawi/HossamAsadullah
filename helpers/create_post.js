//Components
import React from "react";
//Modal
import Post from '../Model/Post';


async function create_post(req, res) {
    try {
        // create a new project with the data in body
        await Post.create(req.body);
        // send a response that everything went wrong
        res.status(201).json({
            message: "Post has created!",
            data: req.body,
        });
    } catch (error) {
        // The errors from the server
        const errorsObject = error.errors;
        const errorsArray = [];

        // check if there are errors
        if (errorsObject) {
            // put all messages in array
            for (const property in errorsObject) {
                errorsArray.push(errorsObject[property].message);
            }
        }

        // Send the error message && Array of errors message
        res.status(500).json({ message: error.message, errorsArray });
    }
}

export default create_post;

/************************************************************************/
// What we return
/************************************************************************/
/*
Success: {
    [1]: message,
    [2]: Post data
}

Fail: {
    [1]: error message,
    [2]: fields error messages array 
}
*/