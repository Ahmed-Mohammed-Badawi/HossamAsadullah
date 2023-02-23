import dbConnect from "../config/dbConnect";
import Post from "../Model/Post";
import Project from "../Model/Project";

export async function getTheResult({search, page, categories, time}) {
    //Search object if every item is not empty put it in the search object
    const searchObject = {};
    if (search) searchObject.header = {$regex: search, $options: 'i'};
    if (categories) searchObject.category = {$in: categories};
    if (time) {
        if (time === 'last month') {
            searchObject.createdAt = {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}
        } else if (time === 'last year') {
            searchObject.createdAt = {$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        }
    }

    //Fetch data from database
    const result = await Post.find(searchObject).limit(4).skip((page - 1) * 4).sort({createdOnServerAt: -1});
    //Get the Length Of the Post Collection
    const postLength = await Post.find(searchObject).countDocuments();
    return { result: result, postLength: postLength };
};


export async function getThePortfolioResult({search, page, categories, date}) {
    //Search object if every item is not empty put it in the search object
    const searchObject = {};
    if (search) searchObject.nameOfProject = {$regex: search, $options: 'i'};
    if (categories) searchObject.technologies = {$in: categories};
    if (date) {
        if (date === 'last month') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setMonth(new Date().getMonth() - 1))}
        } else if (date === 'last year') {
            searchObject.createdOnServerAt = {$gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        }
    }

    //Fetch data from database
    const result = await Project.find(searchObject).limit(4).skip((page - 1) * 4).sort({createdOnServerAt: -1});
    //Get the Length Of the Post Collection
    const projectLength = await Project.find(searchObject).countDocuments();
    return { result: result, projectLength: projectLength };
}

// get All Posts Ids For The Post Preview
export async function getAllPostsIdsForThePostPreview() {
    await dbConnect();
    const posts = await Post.find({});
    return posts.map((post) => {
        return {
            params: {
                postId: post._id.toString(),
            },
        };
    });
}

// get All Projects Ids For The Project Preview
export async function getAllProjectsIdsForTheProjectPreview() {
    await dbConnect();
    const projects = await Project.find({});
    return projects.map((project) => {
        return {
            params: {
                projectId: project._id.toString(),
            },
        };
    });
}