
//######################################################################################################################
// Projects and Blog Dashboard Technologies Helpers (UI helpers) not on the server
//######################################################################################################################

import classes from "../components/Pages/dashboard/TechnologiesList.module.scss";

export const createElements = (data) => {
    // Array of the technologies elements
    let elementsArray = [];
    // Loop through all the technologies in the data object state
    for (let technology in data) {
        // Loop through all the technologies in the data object state and return elements styled with the count
        switch (technology) {
            case "Html":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#DD4B25'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Css":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#2862E9'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Scss":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#E46ACF'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Bootstrap":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#8411F6'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Tailwind":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#1CBFB0'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Javascript":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#EFD81D'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "jQuery":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#0863A3'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "reactJs":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#5ED3F3'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "nextJs":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#000000'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Git":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#e94e32'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Github":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#333333'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "NodeJs":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#6cc24a'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "ExpressJs":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#6cc24a'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "GraphQl":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#de2fa5'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "MongoDb":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#00E15F'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Php":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#8892be'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Wordpress":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#005082'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Laravel":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#f72c1f'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Netlify":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#0e1e25'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Firebase":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#ffa610'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Vercel":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#000000'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Heroku":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#430098'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "MySql":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#00718b'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "AdobeXd":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#f75eee'}}>{technology + ': ' + data[technology]}</div>);
                break;
            case "Figma":
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: '#f76e5f'}}>{technology + ': ' + data[technology]}</div>);
                break;
            default:
                elementsArray.push(<div key={technology} className={classes.Item} style={{color: 'black'}}>{technology + ': ' + data[technology]}</div>);
        }
    }
    return elementsArray;
}
