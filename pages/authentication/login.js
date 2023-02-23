import React, { useRef, useState } from "react";
import classes from "../../styles/authentication/login.module.scss";
import Image from "next/image";
import Link from "next/link";
// Authentication finctionality
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
// Notifications
import { toast } from "react-toastify";
// Spinner
import Spinner from "../../components/layout/Spinner";

function login() {
    // init Router
    const router = useRouter();

    // States
    const [loading, setLoading] = useState(false);

    // // init Authentification
    // const { data: session, status } = useSession();

    // useEffect(() => {
    //     // Redirect if user is already logged in
    //     if (status === "authenticated" && session) {
    //         router.replace("/");
    //     }
    // }, [session, status]);

    // References
    const emailRef = useRef();
    const passwordRef = useRef();

    // Functions
    async function handleSubmit(e) {
        e.preventDefault();
        // Values
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Check if Email is Valid email address with regex
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return toast.error("Please provide a valid email address");
        }

        // Check if Password is at least 6 characters long
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

        // Set loading to true
        setLoading(true);

        // Sign in
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        // Set loading to false
        setLoading(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("You have successfully logged in");
            router.push("/");
        }
    }

    // // Show Login Page if the status is loading
    // if (status === "loading") {
    //     return <Spinner size={2} color={"#ff5500"} />;
    // }

    return (
        <div className='container'>
            <div className={classes.Content_Container}>
                <div className={classes.Content}>
                    <section className={classes.Left_Section}>
                        <div className={classes.Image_Container}>
                            <Image
                                src='/Images/Auth/signup_2.png'
                                alt='signup illustration'
                                layout='fill'
                                objectFit='contain'
                            />
                        </div>
                    </section>
                    <section className={classes.Right_Section}>
                        <form onSubmit={handleSubmit}>
                            <h1>Login</h1>
                            <div className={classes.Input_Container}>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder=' '
                                    ref={emailRef}
                                />
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className={classes.Input_Container}>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder=' '
                                    id='password'
                                    ref={passwordRef}
                                />
                                <label htmlFor='password'>Password</label>
                            </div>
                            <div className={classes.Signup_Buttons_Container}>
                                <button
                                    className={classes.Signup_Button}
                                    type='submit'
                                >
                                    {loading ? (
                                        <Spinner size={2} color={`#ffffff`} />
                                    ) : (
                                        `Login`
                                    )}
                                </button>
                                <a
                                    href='/api/auth/signin'
                                    className={classes.Google_Signup}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn("google", {
                                            callbackUrl: "/",
                                        });
                                    }}
                                >
                                    <Image
                                        src='/Images/icons/google.png'
                                        alt='google logo'
                                        width={20}
                                        height={20}
                                    />
                                </a>
                            </div>
                            <Link href='/authentication/signup'>
                                <a>Don't have an account? Register</a>
                            </Link>
                            <Link href='/authentication/resetPassword_p1'>
                                <a>Forgot Password</a>
                            </Link>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default login;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Get the session from the context
    const session = await getSession(ctx);

    if (session) {
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
