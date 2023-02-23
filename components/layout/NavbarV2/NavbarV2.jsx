import React, { useState, useEffect } from "react";
// Components Imports
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// Icons Imports
import HomeIcon from "./Icons/HomeIcon";
import AboutIcon from "./Icons/AboutIcon";
import PortfolioIcon from "./Icons/PortfolioIcon";
import BlogIcon from "./Icons/BlogIcon";
import ContactIcon from "./Icons/ContactIcon";
import RigestirationIcon from "./Icons/RigestirationIcon";
import LoginIcon from "./Icons/LoginIcon";
import SignupIcon from "./Icons/SignupIcon";
// Style
import classes from "./NavbarV2.module.scss";
// Redux toolkit

// Authenticated User
import { useSession, signOut } from "next-auth/react";

function NavbarV2() {
    const { data: session, status } = useSession();
    let { userImage, firstName, lastName, username } = session?.user || {};

    // set the state of Authentication Menu
    const [showOptions, setShowOptions] = useState(false);
    // Initialize the router
    const router = useRouter();

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

    // Close the Options when the user clicks outside the options
    
    useEffect(() => {
        // Hide the options when the user clicks outside the options
        document.addEventListener("click", (e) => {
            // get the class UserInfo_Mobile and its children and if the target is not one of them close the options
            if (!e.target.closest(`.${classes.Navbar_UserImage}`)) {
                hideOptionsHandler();
            }
        });
        return () => {
            document.removeEventListener("click", hideOptionsHandler);
        };
    }, []);


    // handle logout
    const handleLogout = (e) => {
        e.preventDefault();
        // Hide the options
        hideOptionsHandler();
        // Logout
        signOut();
    };

    return (
        <nav className={classes.Navbar}>
            {/* Logo */}
            <div className={classes.Navbar_Logo}>
                <Link href={"/"}>AMB</Link>
            </div>
            {/* Links */}
            <ul className={classes.Navbar_Links}>
                <li>
                    <Link href={"/"}>
                        <a
                            aria-label={"Go to Home Page"}
                            className={
                                router.pathname == "/"
                                    ? classes.Link_Active
                                    : ""
                            }
                            alt='Home'
                        >
                            <HomeIcon />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/about"}>
                        <a
                            aria-label={"Go to About Page"}
                            className={
                                router.pathname == "/about"
                                    ? classes.Link_Active
                                    : ""
                            }
                            alt='About'
                        >
                            <AboutIcon />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/portfolio"}>
                        <a
                            aria-label={"Go to Portfolio Page"}
                            className={
                                router.pathname == "/portfolio"
                                    ? classes.Link_Active
                                    : ""
                            }
                            alt='Portfolio'
                        >
                            <PortfolioIcon />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/blog"}>
                        <a
                            aria-label={"Go to Blog Page"}
                            className={
                                router.pathname == "/blog"
                                    ? classes.Link_Active
                                    : ""
                            }
                            alt='Blog'
                        >
                            <BlogIcon />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/contact"}>
                        <a
                            aria-label={"Go to Contact Page"}
                            className={
                                router.pathname == "/contact"
                                    ? classes.Link_Active
                                    : ""
                            }
                            alt='Contact'
                        >
                            <ContactIcon />
                        </a>
                    </Link>
                </li>
            </ul>
            {/* User Image */}
            <div
                onClick={showAndHideOptionsHandler}
                className={classes.Navbar_UserImage}
            >
                {session ? (
                    <Image
                        src={
                            userImage ? userImage.url : "/Images/Auth/User.png"
                        }
                        width={50}
                        height={50}
                        alt={"User Name"}
                    />
                ) : (
                    <RigestirationIcon />
                )}
            </div>
            <ul
                className={[
                    classes.Navbar_Login,
                    showOptions && classes.Navbar_Login__Ul,
                ].join(" ")}
            >
                {!session ? (
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
                ) : (
                    <>
                        <li className={classes.USER}>
                            <Link href={"/authentication/userInformations"}>
                                <a
                                    className={classes.UserInformation}
                                    aria-label={"Go to User Informations Page"}
                                    onClick={hideOptionsHandler}
                                >
                                    <div className={classes.UserImage}>
                                        <Image
                                            src={
                                                userImage
                                                    ? userImage.url
                                                    : `/Images/Auth/User.png`
                                            }
                                            width={50}
                                            height={50}
                                            alt={"User Image"}
                                        />
                                    </div>
                                    <div
                                        title={`${firstName} ${lastName} \n @${username}`}
                                        className={classes.UserText}
                                    >
                                        <h2>{`${firstName} ${lastName}`}</h2>
                                        <p>@{username}</p>
                                    </div>
                                </a>
                            </Link>
                        </li>
                        <li onClick={hideOptionsHandler}>
                            <Link href={"/api/auth/signOut"} passHref>
                                <a
                                    className={classes.Navbar_LogOut}
                                    href={"/api/auth/signOut"}
                                    onClick={handleLogout}
                                >
                                    <div>
                                        <Image
                                            src={
                                                "/Images/icons/Navbar2/LogOut.svg"
                                            }
                                            layout='fill'
                                            alt={"Log Out"}
                                        />
                                    </div>{" "}
                                    Logout
                                </a>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavbarV2;
