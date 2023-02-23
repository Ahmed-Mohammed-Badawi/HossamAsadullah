import classes from '../styles/about.module.scss';
import Image from "next/image";
import Head from "next/head";
//Imports
import SocialMediaIcon from "../components/Pages/about/SocialMediaIcon";

const about = () => {
    return (
        <>
            <Head>
                <title>About</title>
                <meta name={"description"} content={"Ahmed Mohammed information's, Details, skills and social media accounts "}/>
            </Head>
            <div className={"container"}>
                <div className={classes.ContentContainer}>
                    <div className={classes.Grid}>
                        <div className={classes.Grid_Left}>
                            {/*IMAGE*/}
                            <section className={classes.ImagePart}>
                                <span></span>
                                <span></span>
                                <div className={classes.ImagePart_C1}>
                                    <div className={classes.ImagePart_C2}>
                                        <Image src={'/Images/Avatar.jpg'} alt={"Ahmed Mohammed Badawi Image"} width={360} height={360} objectFit={"cover"}
                                               objectPosition={"top"}/>
                                    </div>
                                </div>
                            </section>
                            {/*INFO PART*/}
                            <section className={classes.InfoPart}>
                                <div className={classes.InfoPart_Text}>
                                    <h1>Ahmed Mohammed</h1>
                                    <p>Frontend Developer</p>
                                    <p>UI Designer</p>
                                </div>
                                <div className={classes.InfoPart_Social}>
                                    <SocialMediaIcon accountLink={"https://www.facebook.com/A.sni9er"}
                                                     icon={'/Images/icons/About_Fb.svg'}
                                                     iconAlt={"Facebook account link"}/>
                                    <SocialMediaIcon accountLink={"https://twitter.com/Ahmed_M_Badawi"}
                                                     icon={'/Images/icons/About_Tw.svg'}
                                                     iconAlt={"Twitter account link"}/>
                                    <SocialMediaIcon accountLink={"https://wa.me/201158350160"}
                                                     icon={'/Images/icons/About_Wp.svg'}
                                                     iconAlt={"Whatsapp account link"}/>
                                    <SocialMediaIcon accountLink={"https://t.me/A7med_M_Badawi"}
                                                     icon={'/Images/icons/About_Tg.svg'}
                                                     iconAlt={"Telegram account link"}/>
                                    <SocialMediaIcon accountLink={"https://github.com/Ahmed-Mohammed-Badawi"}
                                                     icon={'/Images/icons/About_Gh.svg'}
                                                     iconAlt={"Github account link"}/>
                                </div>
                                <div className={classes.InfoPart_CV}>
                                    <button>CV <Image src={'/Images/icons/CV.svg'} width={30} height={30} alt={'CV'}/>
                                    </button>
                                </div>
                            </section>
                        </div>
                        <div className={classes.Grid_Right}>
                            <h2>About <span className={"highlighted"}>Me</span></h2>
                            <p>I DESIGN AND CODE BEAUTIFUL THINGS, AND I LOVE WHAT I DO.</p>
                            {/*PERSONAL INFO*/}
                            <section className={classes.PersonalInfo}>
                                <div className={classes.PersonalInfo_Item}>
                                    <p className={classes.Description}>
                                        Hello I'm Ahmed Mohammed Badawi From Egypt.
                                        I work as a freelancer front-End Developer online & offline.
                                        I've more than 2 years of experience in this field and more than 1 as a UI
                                        Designer.
                                        I love Designing and Coding and hope you like what I do.
                                    </p>
                                </div>
                                <div className={classes.PersonalInfo_Item}>
                                    <div className={classes.PersonalInfo_Item__Container}>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Birthday</h3>
                                            <p>Feb 13, 2001</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Phone</h3>
                                            <p>+201120808410</p>
                                            <p>+201274538793</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Address</h3>
                                            <p>Egypt, Cairo</p>
                                        </div>
                                    </div>
                                    <div className={classes.PersonalInfo_Item__Container}>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Freelance</h3>
                                            <p>Available</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Languages</h3>
                                            <p>Arabic (Native)</p>
                                            <p>English</p>
                                        </div>
                                        <div className={classes.PersonalInfo_Item__Container__Item}>
                                            <h3>Nationality</h3>
                                            <p>Egyptian</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*How Do I Work*/}
                            <section className={classes.HowDoIWork}>
                                <h2>How Do I <span className={"highlighted"}>Work?</span></h2>
                                <div className={classes.HowDoIWork_Container}>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>1</span>
                                        <h3>Think</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>2</span>
                                        <h3>Sketch</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>3</span>
                                        <h3>Design</h3>
                                    </div>
                                    <div className={classes.HowDoIWork_Container__Item}>
                                        <span>4</span>
                                        <h3>Code</h3>
                                    </div>
                                </div>
                            </section>
                            {/*My Skills*/}
                            <section className={classes.MySkills}>
                                <h2>My <span className={"highlighted"}>Skills</span></h2>
                                <div className={classes.MySkills_Container}>
                                    <p className={classes.MySkills_Container__Item}>
                                        HTML
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        CSS
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        JavaScript
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        React
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Redux
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Next.js
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Bootstrap
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Tailwind
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Adobe XD
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Figma
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Photoshop
                                    </p>
                                    <p className={classes.MySkills_Container__Item}>
                                        Illustrator
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default about;
