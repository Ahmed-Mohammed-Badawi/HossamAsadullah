import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider
import CredentialsProvider from "next-auth/providers/credentials";
// Mongoose and DB
import User from "../../../Model/Users";
import dbConnect from "../../../config/dbConnect";
// import ComparePassword
import { CompareMyPasswordWithTheHashedPassword } from "../../../helpers/Bcrypt_functions";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                },
            },
        }),
        // Add CredentialsProvider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",

            async authorize(credentials, req) {
                // Connect to DB
                dbConnect();
                // Add logic here to look up the user from the credentials supplied
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    // If no user was returned, redirect to the login page
                    throw new Error("No user found");
                    // return null
                    return null;
                }

                if (user) {
                    // Check if the password is correct
                    const isMatch =
                        await CompareMyPasswordWithTheHashedPassword(
                            credentials.password,
                            user.password
                        );

                    if (!isMatch) {
                        // If the password is incorrect, redirect to the login page
                        throw new Error("Your password is incorrect");
                        // return null
                        return null;
                    }
                    // Any object returned will be saved in `user` property of the JWT
                    return Promise.resolve(user);
                }
            },
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            const {
                user: childUser,
                account: childAccount,
                profile: childProfile,
            } = user;

            // IF THE PROVIDER WAS CREDENTIALS
            if (childAccount.provider === "credentials") {
                // get the signIn Data
                const email = user.credentials.email;
                const password = user.credentials.password;
                // Set the user data
                user.email = email;
                user.password = password;
                return user;
            }

            // IF THE PROVIDER WAS GOOGLE
            if (childAccount.provider === "google") {
                // connect to the database
                dbConnect();

                // check if the user already exists in the database
                const userExists = await User.findOne({
                    email: childUser.email,
                });

                // if the user exists, return true
                if (userExists) {
                    return true;
                }

                // if the user doesn't exist, create a new user
                const newUser = await User.create({
                    userImage: { url: childUser.image },
                    firstName: childProfile.given_name,
                    lastName: childProfile.family_name,
                    email: childUser.email,
                    confirmed: childProfile.email_verified,
                    password: "googleSignIn",
                    role: "user",
                });

                // if the user is created, pass the new user to the session
                if (newUser) {
                    return true;
                }

                // if the user is not created, return false
                return false;
            }

            return true;
        },

        async session({ session, token }) {
            //  get the user from the database
            if (session.user.email || token.email) {
                const { userImage, firstName, lastName, email, username } =
                    await User.findOne({
                        email: session.user.email || token.email,
                    });

                session.user = {
                    userImage,
                    firstName,
                    lastName,
                    email,
                    username,
                };
            }

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        token: {
            maxAge: 15 * 24 * 60 * 60, // 15 days
        },
    },
    session: {
        jwt: true,
    },
};

export default NextAuth(authOptions);
