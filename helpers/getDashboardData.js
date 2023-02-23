import Project from "../Model/Project";
import Post from "../Model/Post";
import axios from "axios";

// GET PROJECTS NUMBERS
export const getProjectsNumbers = async (req, res) => {
    try {
        const result = await Project.find();
        return res.status(200).json({success: true, result});
    } catch (error) {
        return res.status(500).json({success: false, error});
    }
};

// GET Blog NUMBERS
export const getBlogPostsNumbers = async (req, res) => {
    try {
        const result = await Post.find();
        return res.status(200).json({success: true, result});
    } catch (error) {
        return res.status(500).json({success: false, error});
    }
};

// SEND PROJECTS DASHBOARD REQUEST
export const sendAndGetDashboardData = async (origin, path) => {
    // initialize startup data
    let published = 0;
    let unpublished = 0;
    // get absolute url
    const data = await axios.get(`${origin}/api/${path}`).then(res => res.data.result);
    // loop through the data and count the projects
    data.forEach(project => {
        if (project.published) {
            published++;
        } else {
            unpublished++;
        }
    });
    // get the last three items
    const lastThreeItems = getLastThreeItems(data);
    // return the data of chart to the page getServerSideProps
    return {
        chartData: [
            {name: "All", value: published + unpublished},
            {name: "Published", value: published},
            {name: "Unpublished", value: unpublished},
        ],
        lastThreeItems,
    }
}

// Handle Data and return the last three items
const getLastThreeItems = (data) => {
    /*
    // * 1 - loop through the data and convert date to number by new Date().getTime()
    * 2 - sort the data by the converted date
    * 3 - get the last three items and return them
    * */

    // 2 - sort the data by the converted date
    const sortedData = data.sort((a, b) => {
        return new Date(b.createdOnServerAt).getTime() - new Date(a.createdOnServerAt).getTime();
    });

    // 3 - get the last three items and return them
    return sortedData.slice(0, 3);
}