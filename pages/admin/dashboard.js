import React from "react";
import Head from "next/head";
// main component
import DashboardContent from "../../components/Pages/dashboard/DashboardContent";
// get the absolute url
import nextAbsoluteUrl from "next-absolute-url";
//Helper
import {sendAndGetDashboardData} from "../../helpers/getDashboardData";


function dashboard({dataObj1, dataObj2, lastThreeProjects, lastThreeBlogPosts}) {

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className={"container min-vh-full"}>
                <DashboardContent
                    data1={dataObj1}
                    data2={dataObj2}
                    lastThreeProjects={lastThreeProjects}
                    lastThreeBlogPosts={lastThreeBlogPosts}
                />
            </div>
        </>
    );
}

export default dashboard;


export async function getServerSideProps({req}) {
    // get absolute url
    const {origin} = nextAbsoluteUrl(req);
    // get Projects data from the server
    const {chartData: dataObj1, lastThreeItems: lastThreeProjects} = await sendAndGetDashboardData(origin, 'project');
    // get Blog data from the server
    const {chartData: dataObj2, lastThreeItems: lastThreeBlogPosts} = await sendAndGetDashboardData(origin, 'post');


    // return the data to the page
    return {
        props: {
            dataObj1,
            dataObj2,
            lastThreeProjects,
            lastThreeBlogPosts,
        },
    };
}
