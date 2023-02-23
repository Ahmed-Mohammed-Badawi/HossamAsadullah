import { useEffect, useState } from "react";
import classes from "../styles/Home.module.scss";
// Component Imports
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
// Custom Components
import ProjectCard from "../components/layout/ProjectCard/ProjectCard";
import ProjectCardSkeleton from "../components/layout/ProjectCard/ProjectCard_Skelton/ProjectCard_Skelton";
import BlogCard from "../components/layout/BlogCard/BlogCard";
import BlogCardSkeleton from "../components/layout/BlogCard/BlogCard_Skelton/BlogCard_Skelton";
import TestimonialCard from "../components/Pages/home/TestimonialCard";

// Next Auth Session
import { useSession } from "next-auth/react";

export default function Home() {

    // Init Session
    const { data: session, status } = useSession();

    // State
    const [lastThreeProjects, setLastThreeProjects] = useState(null);
    const [lastThreePosts, setLastThreePosts] = useState(null);

    useEffect(() => {
        // get the last three projects and posts from the database
        axios.get("/api/post/getLastThree").then((res) => {
            const { lastThreeProjects, lastThreePosts } = res.data;
            // set the state
            setLastThreeProjects(lastThreeProjects);
            setLastThreePosts(lastThreePosts);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta
                    name='description'
                    content='AMB is a personal website for Ahmed Mohammed showing his works as a frontend developer (reactJs)'
                />
            </Head>
            <div className={"container"}>
                {/* Header */}
                <header className={classes.Header}>
                    <section className={classes.Text}>
                        <p className={classes.Hi}>Hello!</p>
                        <h1 className={classes.Name}>
                            I'm{" "}
                            <span className='highlighted'>Ahmed Mohammed</span>
                        </h1>
                        <p className={classes.Description}>
                            I'm a Freelance UI/UX Designer and Developer based
                            in Egypt, Cairo. I strives to build immersive and
                            beautiful web applications through carefully crafted
                            code and user-centric design.
                        </p>
                        <div className={classes.Buttons}>
                            <button role={"button"} aria-label={"Download CV"}>
                                Download CV
                            </button>
                            <button
                                role={"button"}
                                aria-label={"Go to linkedin profile"}
                            >
                                <Image
                                    src={"/Images/icons/linkedin.svg"}
                                    width={40}
                                    height={40}
                                    alt={"linkedin"}
                                />
                            </button>
                        </div>
                    </section>
                    <section className={classes.Image}>
                        <Image
                            src={"/Images/Home/programming.svg"}
                            width={450}
                            height={450}
                            alt={"programming"}
                        />
                    </section>
                </header>

                {/* Content */}
                <div className={classes.Content}>
                    <section className={classes.Portfolio}>
                        <h2>
                            <Image
                                src={"/Images/Home/ProjectsIcon.svg"}
                                width={38}
                                height={38}
                                alt={"Projects"}
                            />{" "}
                            Portfolio{" "}
                            <Link href='/portfolio'>
                                <a>
                                    <Image
                                        src={"/Images/Home/ShowPage.svg"}
                                        width={24}
                                        height={24}
                                        alt={"Show  Portfolio Page"}
                                    />
                                </a>
                            </Link>
                        </h2>
                        <div className={classes.Portfolio_Cards__Container}>
                            {lastThreeProjects
                                ? lastThreeProjects.map(
                                      (ProjectData, index) => {
                                          return (
                                              <ProjectCard
                                                  src={
                                                      ProjectData.mainImage.url
                                                  }
                                                  name={
                                                      ProjectData.nameOfProject
                                                  }
                                                  description={
                                                      ProjectData.projectDescription
                                                  }
                                                  date={
                                                      ProjectData.createdAtInReal ||
                                                      ProjectData.createdOnServerAt
                                                  }
                                                  github={
                                                      ProjectData.githubLink
                                                  }
                                                  live={
                                                      ProjectData.livePreviewLink
                                                  }
                                                  projectId={ProjectData._id}
                                                  key={"PP" + index}
                                              />
                                          );
                                      }
                                  )
                                : [0, 0, 0].map((_, index) => (
                                      <ProjectCardSkeleton key={"PP" + index} />
                                  ))}
                        </div>
                    </section>
                    <section className={classes.Blog}>
                        <h2>
                            <Image
                                src={"/Images/Home/BlogIcon.svg"}
                                width={38}
                                height={38}
                                alt={"Blog"}
                            />{" "}
                            Blog{" "}
                            <Link href='/blog'>
                                <a>
                                    <Image
                                        src={"/Images/Home/ShowPage.svg"}
                                        width={24}
                                        height={24}
                                        alt={"Show Blog Page"}
                                    />
                                </a>
                            </Link>
                        </h2>
                        <div className={classes.Portfolio_Cards__Container}>
                            {lastThreePosts
                                ? lastThreePosts.map((postData) => {
                                      return (
                                          <Link
                                              key={postData._id}
                                              href={`/post/${postData._id}`}
                                          >
                                              <a
                                                  className={
                                                      classes.Reset_BlogCard
                                                  }
                                              >
                                                  <BlogCard
                                                      src={
                                                          postData.mainImage.url
                                                      }
                                                      title={postData.header}
                                                      categories={
                                                          postData.category
                                                      }
                                                  />
                                              </a>
                                          </Link>
                                      );
                                  })
                                : [0, 0, 0].map((_, index) => (
                                      <BlogCardSkeleton key={"PS" + index} />
                                  ))}
                        </div>
                    </section>
                    <section className={classes.Testimonials}>
                        <h2>
                            <Image
                                src={"/Images/Home/Testimonials.svg"}
                                width={36}
                                height={36}
                                alt={"Testimonials"}
                            />{" "}
                            Testimonials
                        </h2>
                        <div className={classes.Portfolio_Cards__Container}>
                            <TestimonialCard
                                src={"/Images/Home/Ali_Mustafa.jpg"}
                                name={"Ali Mustafa"}
                                content={
                                    "Ahmed is a very talented developer and a great person to work with. He is very professional and always delivers on time. I highly recommend him."
                                }
                            />
                            <TestimonialCard
                                src={"/Images/Home/Ali_Magdy.jpg"}
                                name={"Ali Magdy"}
                                content={
                                    "Great developer, very professional and always delivers on time. I highly recommend him."
                                }
                            />
                            <TestimonialCard
                                src={"/Images/Home/Ahmed.jpg"}
                                name={"Ahmed M. Abd Eldaim"}
                                content={
                                    "If you are looking for a professional developer, Ahmed is the right person for you. He is very professional and always delivers on time. I highly recommend him."
                                }
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
