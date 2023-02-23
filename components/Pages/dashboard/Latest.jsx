import React from "react";
import classes from "./Latest.module.scss";

import Link from "next/link";
import Image from "next/image";

function Latest({typeOfItem, id, name, image, date}) {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Link href={`/${typeOfItem}/${id}`}>
            <a className={[classes.LinkContainer].join(' ')}>
                <article className={classes.Latest}>
                    <div className={classes.Latest_Image}>
                        <div>
                            <Image src={image} alt={name} width={200} height={200}/>
                        </div>
                    </div>
                    <div className={classes.Latest_Content}>
                        <p>{name}</p>
                        <p>{formattedDate}</p>
                    </div>
                </article>
            </a>
        </Link>
    );
}

export default Latest;
