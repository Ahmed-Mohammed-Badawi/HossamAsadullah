import {useEffect, useState} from "react";
import axios from "axios";
import {createElements} from "../../../helpers/getDashboardDataForUI";

import Spinner from "../../layout/Spinner";


const TechnologiesList = ({path, nameOfArray}) => {
    const [data, setData] = useState({});

    // Make an Object of technologies and their count
    const insertData = (data) => {
        const technologiesObject = {};
        // Loop through all the data
        data.forEach(current => {
            // Loop through all the technologies
            current[nameOfArray].forEach(technology => {
                if (technologiesObject[technology]) {
                    technologiesObject[technology]++;
                } else {
                    technologiesObject[technology] = 1;
                }
            });
        })
        // Set the data to the object of technologies and their count
        setData(technologiesObject);
    }

    useEffect(() => {
        // Set the data variable to the data from the API
        let result;
        // get the data from the API and set it to the result variable and run the insertData function on Result
        axios.get(`/api/${path}`).then(res => {
            result = res.data.result
            if (result && result.length > 0) insertData(result);
        });

    }, []);


    return (
        // Check if the data is empty and if it is, return a loading screen
        <>
            {Object.keys(data).length > 0 ? createElements(data) :
                <div className={'flex flex-center flex-middle h-full'}><Spinner/></div>}
        </>
    );
}

export default TechnologiesList;