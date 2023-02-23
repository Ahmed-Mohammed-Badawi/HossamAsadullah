import React from "react";
import classes from "../../components/Pages/createProject/createProject.module.scss";
// React Imports
import Head from "next/head";

// IMPORTS
import CreateProjectContainer from "../../components/Pages/createProject/container/createProjectContainer";

function createProject() {
    return (
        <>
            <Head>
                <title>Create Project</title>
            </Head>
            <div
                className={[
                    "container min-vh-full py-6",
                    classes.CreateProject,
                ].join(" ")}
            >
                <CreateProjectContainer />
            </div>
        </>
    );
}

export default createProject;
