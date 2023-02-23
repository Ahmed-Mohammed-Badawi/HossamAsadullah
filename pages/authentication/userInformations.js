import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "../../styles/authentication/userInformations.module.scss";

import axios from "axios";
//  Import Image Uploader
import { UploadImageToCloudinary } from "../../redux/actions/createProjectActions";
import { useDispatch } from "react-redux";
import { setU_Info } from "../../redux/slices/registrationSlice";
// notification
import { toast } from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";
// Auth
import { useSession, getSession } from "next-auth/react";

function userInformations() {
    // Get the dispatch function
    const dispatch = useDispatch();

    // init Authentification
    const { data: session, status } = useSession();

    // States
    const [loading, setLoading] = useState(false);

    // image uploader
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // States and refs
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [userNameAvailable, setUserNameAvailable] = useState(true);
    const [userNameValid, setUserNameValid] = useState(true);
    const [userNamechecking, setUserNamechecking] = useState(false);

    // timer for the username availability
    let timer;

    // when user input username and leave the input field check if username is available
    const checkUsername = async (e) => {
        // set the username state to the value of the input field
        setUsername(e.target.value);

        // username regex to check if the username is valid
        const usernameRegex = /^[a-zA-Z0-9_\.]+$/;

        // check if the username is valid
        if (usernameRegex.test(e.target.value)) {
            // if the username is valid check if the username is available
            setUserNameValid(true);
        } else {
            // if the username is not valid set the username availability to false
            setUserNameValid(false);
        }

        // change the state of checking username to true
        setUserNamechecking(true);

        // check if the username is available or not on the server
        const { data } = await axios.get(
            `/api/user/check_username?username=${e.target.value}`
        );

        // set the state of checking username to false
        setUserNamechecking(false);

        // if the username is available set the state to true
        if (data.isValid) {
            setUserNameAvailable(true);
        } else {
            setUserNameAvailable(false);
        }
    };

    // when user click on the submit button
    const submit = async (e) => {
        e.preventDefault();

        // if the state of username validity is false show a notification
        if (!userNameValid) {
            toast.error("Username is not valid");
            return;
        }

        // if the state of username checking is true show a notification
        if (userNamechecking) {
            toast.error("Please wait for the username to be checked");
            return;
        }

        // initial Image data for the data after uploading the image to cloudinary
        let userImage = {
            url: null,
            id: null,
        };

        // check if username is available
        if (userNameAvailable) {
            // check if user uploaded an image

            if (!session.user.email) {
                toast.error("Please register or login first");
                return;
            }

            if (image) {
                toast.info("Uploading image to cloudinary");
                // upload the image to cloudinary
                const data = await dispatch(
                    UploadImageToCloudinary({
                        ImageFile: image,
                        Save_Method_And_Place: "AMB_USERS",
                    })
                );

                // check if image is uploaded successfully
                if (data) {
                    // set the user image object
                    userImage = {
                        url: data.payload.data.secure_url,
                        id: data.payload.data.public_id,
                    };
                    // send notification to the user
                    toast.success("Image uploaded successfully");
                } else {
                    // send notification to the user
                    toast.error("Image upload failed");
                }
            }

            // Set the loading state to true
            setLoading(true);

            // save the user informations
            const res = await axios.put(`/api/user/updateUserInfo`, {
                UE: session.user.email,
                firstName,
                lastName,
                username,
                userImage: {
                    url: userImage.url,
                    id: userImage.id,
                },
            });

            // Set the loading state to false
            setLoading(false);

            // check the response status code
            if (res.status === 200) {
                // send notification to the user
                toast.success(
                    "User informations saved successfully, you can now login"
                );

                // remove the user informations from the redux store
                dispatch(setU_Info({ UI: null, UE: null }));

                // Show an alert to the user that page will be reloaded to update the user informations
                window.location.reload();
            }

            if (res.status === 400) {
                // send notification to the user
                toast.error("Something went wrong, please try again");
            }
        } else {
            toast.error("Username is not available");
        }
    };

    //  Set the Image of user in a variable to be used in the JSX
    let ImageInUse = null;

    if (imagePreview) {
        ImageInUse = imagePreview;
    } else if (session && session?.user?.userImage?.url) {
        ImageInUse = session?.user?.userImage?.url;
    } else {
        ImageInUse = "/Images/Auth/User.png";
    }

    return (
        <div className='container'>
            <div className={classes.Content_Container}>
                <div className={classes.Content}>
                    <section className={classes.Left_Section}>
                        <div className={classes.Image_Container}>
                            <Image
                                src='/Images/Auth/UserInfo.svg'
                                alt='userInformations illustration'
                                layout='fill'
                                objectFit='contain'
                            />
                        </div>
                    </section>
                    <section className={classes.Right_Section}>
                        <form onSubmit={submit}>
                            <h1>User Informations</h1>
                            <div className={classes.Image_Uploader}>
                                <div className={classes.Image_Container}>
                                    <Image
                                        src={ImageInUse}
                                        alt='user image'
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                                <div className={classes.Uploader_Container}>
                                    <input
                                        type='file'
                                        id='UserImage'
                                        onChange={handleChange}
                                    />
                                    <label htmlFor='UserImage'>
                                        <Image
                                            src='/Images/Auth/UploaderIcon.svg'
                                            alt='uploader icon'
                                            width='20px'
                                            height='20px'
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className={classes.Inputs_Container}>
                                <div className={classes.Input_Container}>
                                    <input
                                        type='firstName'
                                        name='firstName'
                                        id='firstName'
                                        placeholder=' '
                                        defaultValue={
                                            status === "authenticated" &&
                                            session.user.firstName
                                        }
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                    <label htmlFor='firstName'>
                                        First Name
                                    </label>
                                </div>
                                <div className={classes.Input_Container}>
                                    <input
                                        type='lastName'
                                        name='lastName'
                                        id='lastName'
                                        placeholder=' '
                                        defaultValue={
                                            status === "authenticated" &&
                                            session.user.lastName
                                        }
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                    <label htmlFor='lastName'>Last Name</label>
                                </div>
                            </div>
                            <div className={classes.Input_Container}>
                                <input
                                    type='text'
                                    name='username'
                                    id='userName'
                                    defaultValue={
                                        status === "authenticated" &&
                                        session.user.username
                                    }
                                    placeholder=' '
                                    onInput={(event) => {
                                        // set the available state to true
                                        setUserNameAvailable(false);

                                        clearTimeout(timer);
                                        timer = setTimeout(
                                            checkUsername,
                                            1000,
                                            event
                                        );
                                    }}
                                />
                                <label htmlFor='userName'>UserName</label>
                            </div>
                            <div className={classes.Signup_Buttons_Container}>
                                <button
                                    className={classes.Signup_Button}
                                    type='submit'
                                >
                                    {loading ? (
                                        <Spinner size={2} color={`#ffffff`} />
                                    ) : (
                                        `Update`
                                    )}
                                </button>
                            </div>
                            <Link href='/authentication/changePassword'>
                                <a>Change password</a>
                            </Link>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default userInformations;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Get the session from the context
    const session = await getSession(ctx);

    // Check if the user is authenticated
    if (!session) {
        // If the user is not authenticated, redirect him to the home page
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
