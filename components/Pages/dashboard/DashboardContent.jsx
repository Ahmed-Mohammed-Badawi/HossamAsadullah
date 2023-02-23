import React from "react";
import classes from "./DashboardContent.module.scss";
import Link from "next/link";
import Image from "next/image";
import Latest from "./Latest";
import TechnologiesList from "./TechnologiesList";

// Imports
import ProjectsChart from "./ProjectsChart";

function DashboardContent({data1, data2, lastThreeProjects, lastThreeBlogPosts}) {

    return (
        <>
            <div className={[classes.Dashboard, "pt-6"].join(" ")}>
                <section className={classes.Dashboard_Projects}>
                    <div className={classes.Dashboard_Projects__Chart}>
                        <ProjectsChart
                            chartsName={"Projects"}
                            data={data1}
                            colors={[
                                "#021E66",
                                "#F73668",
                                "#AF87CE",
                                "#98C1D9",
                            ]}
                        />
                    </div>
                    <div className={classes.Dashboard_Projects__LastThree}>
                        <h2 className="mt-1 mb-2">Latest projects</h2>
                        {lastThreeProjects.map((current, index) => {
                            return <Latest typeOfItem={'projects'} id={current._id} name={current.nameOfProject} image={current.mainImage.url} date={current.createdOnServerAt} key={"L" + index}/>;
                        })}
                    </div>
                </section>
                <section className={classes.Dashboard_Blog}>
                    <div className={classes.Dashboard_Blog__Chart}>
                        <ProjectsChart
                            chartsName={"Blog"}
                            data={data2}
                            colors={[
                                "#021E66",
                                "#F73668",
                                "#AF87CE",
                                "#98C1D9",
                            ]}
                        />
                    </div>
                    <div className={classes.Dashboard_Blog__LastThree}>
                        <h2 className="mb-2 mt-1">Latest Posts</h2>
                        {lastThreeBlogPosts.map((current, index) => {
                            return <Latest typeOfItem={'post'} id={current._id} name={current.header} image={current.mainImage.url} date={current.createdOnServerAt} key={"L" + index}/>;
                        })}
                    </div>
                </section>
                <section className={classes.Dashboard_CreationAndDetails}>
                    <div className={classes.Dashboard_Creation}>
                        <Link href={"/admin/createPost"}>
                            <a>Post</a>
                        </Link>
                        <div className={classes.Dashboard_Creation_Icon}>
                            <div>
                                <Image
                                    src={"/Images/icons/create.svg"}
                                    layout={"fill"}
                                    alt={"create"}
                                />
                            </div>
                        </div>
                        <Link href={"/admin/createProject"}>
                            <a>Project</a>
                        </Link>
                    </div>
                    <div className={classes.Dashboard_Technologies} title="Projects">
                        <TechnologiesList nameOfArray={'technologies'} path={"project"}/>
                    </div>
                    <div className={classes.Dashboard_Technologies} title="Posts">
                        <TechnologiesList nameOfArray={'category'} path={"post"}/>
                    </div>
                </section>
            </div>
        </>
    );
}

export default DashboardContent;
