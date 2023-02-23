import React, { useState, useEffect } from "react";
import classes from "./UserInfo_Mobile.module.scss";
import Image from "next/image";
import Link from "next/link";
// Get the Session Data
import { useSession, signOut } from "next-auth/react";
import LoginIcon from "../NavbarV2/Icons/LoginIcon";
import SignupIcon from "../NavbarV2/Icons/SignupIcon";

function UserInfo_Mobile() {
    // Get the Session Data
    const { data: session } = useSession();

    let { userImage, firstName, lastName, username } = session?.user || {};

    //  initial state of the user image
    let userImageForPreview;
    if (session && userImage) {
        userImageForPreview = userImage.url;
    } else if (session && !userImage) {
        userImageForPreview = "/Images/Auth/User.png";
    } else {
        userImageForPreview = "/Images/Auth/user.svg";
    }

    // State
    const [showOptions, setShowOptions] = useState(false);

    // ########### change the state of options
    function showAndHideOptionsHandler() {
        setShowOptions((prevState) => {
            return !prevState;
        });
    }

    // ########### change the state of options
    function hideOptionsHandler() {
        setShowOptions(false);
    }

    // handle logout
    const handleLogout = (e) => {
        e.preventDefault();
        // Hide the options
        hideOptionsHandler();
        // Logout
        signOut();
    };

    useEffect(() => {
        // Hide the options when the user clicks outside the options
        document.addEventListener("click", (e) => {
            // get the class UserInfo_Mobile and its children and if the target is not one of them close the options
            if (!e.target.closest(`.${classes.UserInfo_Mobile}`)) {
                hideOptionsHandler();
            }
        });
        return () => {
            document.removeEventListener("click", hideOptionsHandler);
        };
    }, []);

    return (
        <div
            className={classes.UserInfo_Mobile}
            onClick={showAndHideOptionsHandler}
        >
            <div className={classes.User_Image}>
                <Image
                    src={userImageForPreview}
                    alt='User Image'
                    width={100}
                    height={100}
                />
                <div className={classes.User_Image_Overlay}></div>
            </div>
            {showOptions && (
                <div className={classes.User_Menu}>
                    <ul>
                        {session ? (
                            <>
                                <li onClick={hideOptionsHandler}>
                                    <Link
                                        href={
                                            "/authentication/userInformations"
                                        }
                                    >
                                        <a>
                                            <div
                                                className={
                                                    classes.User_Menu_Item
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.User_Menu_Item_Image
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            userImage.url ||
                                                            "/Images/Auth/User.png"
                                                        }
                                                        alt='User Image'
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.User_Menu_Item_Info
                                                    }
                                                >
                                                    <h3>
                                                        {firstName} {lastName}
                                                    </h3>
                                                    <p>@{username}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={hideOptionsHandler}>
                                    <Link href={"/user/settings"}>
                                        Settings
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <Link href={"/api/auth/signOut"} passHref>
                                        <a
                                            className={classes.SignOut}
                                            href={"/api/auth/signOut"}
                                            onClick={handleLogout}
                                        >
                                            SignOut
                                        </a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li onClick={hideOptionsHandler}>
                                    <Link href={"/authentication/login"}>
                                        <a aria-label={"Go to Login Page"}>
                                            <div>
                                                <LoginIcon />
                                            </div>
                                            Login
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={hideOptionsHandler}>
                                    <Link href={"/authentication/signup"}>
                                        <a aria-label={"Go to Signup Page"}>
                                            <div>
                                                <SignupIcon />
                                            </div>
                                            SignUp
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserInfo_Mobile;
