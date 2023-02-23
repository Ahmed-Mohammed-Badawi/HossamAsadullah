//Modal Imports
import Project from "../Model/Project";
import Post from "../Model/Post";

//########### PROJECTS ###########
const getLastThreeProjects = async () => {
    // get the items
    const Projects = await Project.find().sort({ _id: -1 }).limit(3);
    return Projects;
};

//############ POSTS ############
const getLastThreePosts = async () => {
    // get the items
    const Posts = await Post.find().sort({ _id: -1 }).limit(3);
    return Posts;
};


export async function getPostsAndProjects(req, res) {
    // get the last three projects
    const lastThreeProjects = await getLastThreeProjects();
    // get the last three posts
    const lastThreePosts = await getLastThreePosts();
    
    // return the data
    res.status(200).json({ lastThreeProjects, lastThreePosts });
}
