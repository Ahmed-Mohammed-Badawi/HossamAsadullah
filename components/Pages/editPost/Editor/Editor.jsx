import React, { useState } from "react";
import Image from "next/image";
import Spinner from "../../../layout/Spinner";
// #############################################################################
// Create Editor
// #############################################################################
import { createReactEditorJS } from "react-editor-js";
import editorConfig from "../../../../helpers/EditorConfig";
// #############################################################################
// Axios
// #############################################################################
import axios from "axios";
// Create the Editor
const ReactEditorJS = createReactEditorJS();
// Redux
import { useDispatch } from "react-redux";
//######## Upload the Image
import { UploadImageToCloudinary } from "../../../../redux/actions/createProjectActions";
//######### Custom style for the Editor
import classes from "./EditorElementsStyle.module.scss";

// Editor Component
function Editor({postId, mainImage, categories, header, checked, defaultData }) {

    // Redux
    const dispatch = useDispatch();
    // Make a ref for the Editor to be able to save
    const editorJS = React.useRef(null);
    const [sending, setSending] = useState(false);

    // Set up the ref on the Editor
    const handleInitialize = React.useCallback((instance) => {
        editorJS.current = instance;
    }, []);

    // Save Data in DB
    const handleSave = React.useCallback(
        async (theImg, header, categories, checked) => {
            const savedData = await editorJS.current.save();

            //Check If there is an Image to Upload and Create the Post
            if (theImg || header || categories || checked || savedData) {
                //Change Btn Text
                setSending(true);
                // Uploading Main IMage and get res data in variables
                const res = await dispatch(
                    UploadImageToCloudinary({
                        ImageFile: theImg,
                        Save_Method_And_Place: "AMB_BLOG",
                    })
                );

                //Get the Data from the response
                const {
                    payload: {
                        data: { secure_url: mainImgURL, public_id: mainImgID },
                    },
                } = res;

                // Update the Post
                axios.put(`/api/post/updatePost`, {
                    postId,
                    mainImgURL,
                    mainImgID,
                    header,
                    categories,
                    checked,
                    savedData,
                    });

                setSending(false);
            } else {
            }
        },
        []
    );

    return (
        <>
            <div className={classes.Editor}>
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={editorConfig}
                    defaultValue={defaultData}
                />
                <button
                    onClick={() => handleSave(mainImage, header, categories, checked)}
                    className={classes.SavBtn}
                >
                    <Image
                        src={"/Images/icons/SavePost.svg"}
                        width={24}
                        height={24}
                        alt={"Save post"}
                    />{" "}
                    {sending ? (
                        <>
                            <span>Please Wait... </span>{" "}
                            <Spinner size={2} color={`#ffffff`} />{" "}
                        </>
                    ) : (
                        "Edit"
                    )}
                </button>
            </div>
        </>
    );
}

export default Editor;
