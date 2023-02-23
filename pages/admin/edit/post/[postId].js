import React, { useState } from "react";
// Style
import classes from "../../../../styles/authentication/editPost.module.scss";
// Components
import PostImage from "../../../../components/Pages/editPost/postImage/PostImage";
import CategoriesMultiSelect from "../../../../components/Pages/editPost/CategoriesMultiSelect/CategoriesMultiSelect";
import EditorPageToComponent from "../../../../components/Pages/editPost/Editor/EditorPageToComponent";
// Hrelpers
import getPostById from "../../../../helpers/getPostById";
// Authenticated
import { getSession } from "next-auth/react";
// Models
import User from "../../../../Model/Users";

function editPost({ post, postId }) {
    // Convert Post to JSON
    const convertedPost = JSON.parse(post);
    console.log(convertedPost);
    // STATES
    const [mainImage, setMainImage] = useState(null);
    const [header, setHeader] = useState(null);
    const [categories, setCategories] = useState(null);
    const [checked, setChecked] = useState(null);

    // FUNCTIONS

    // #1 Set the main Image to the State
    function mainImageHandler(incomingImage) {
        setMainImage(incomingImage);
    }

    return (
        <div className={"container"}>
            <div className={classes.PageContainer}>
                <div className={classes.CreatePost}>
                    <h1>Edit Post</h1>
                    <section className={classes.Left}>
                        <PostImage
                            oldImage={convertedPost.mainImage.url}
                            text={"Post Image"}
                            getMainImage={(postImage) =>
                                mainImageHandler(postImage)
                            }
                        />
                        <input
                            onChange={(e) => setHeader(e.target.value)}
                            type={"text"}
                            name={"heading"}
                            className={classes.Left_Heading}
                            placeholder={"Heading"}
                            defaultValue={convertedPost.header}
                        />
                        <CategoriesMultiSelect
                            defaultCategories={convertedPost.category}
                            updateCategoriesInParent={(categoriesInChild) => {
                                setCategories(categoriesInChild);
                            }}
                        />
                        <div className={classes.Left_Publish}>
                            <input
                                onChange={(e) => setChecked(e.target.checked)}
                                type={"checkbox"}
                                name={"isPublished"}
                                id={"isPublished"}
                                defaultChecked={convertedPost.published}
                            />
                            <label htmlFor={"isPublished"}>Publish</label>
                        </div>
                    </section>
                    <section className={classes.Right}>
                        <EditorPageToComponent
                            postId={postId}
                            defaultData={convertedPost.postData}
                            mainImage={mainImage}
                            header={header}
                            categories={categories}
                            checked={checked}
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}

export default editPost;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async (ctx) => {
    // Check if user is authenticated
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: "/authentication/login",
                permanent: false,
            },
        };
    }

    // If Session Exists get the email and check if the user is an admin
    const { email } = session.user;
    // check if user is an admin
    const admin = await User.findOne({ email, role: "admin" });
    // If user is not an admin redirect to home page
    if (!admin) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    // Get the post id from the url
    const { postId } = ctx.params;

    // Get the post from the database
    const post = await getPostById(postId);

    // If post does not exist redirect to home page
    if (!post) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            post: JSON.stringify(post),
            postId,
        },
    };
};
