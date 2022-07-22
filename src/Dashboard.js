import './Dashboard.css';
import Table from './Table.js';
import Chart from "./Chart";
import { useQuery} from '@apollo/client';
import { GET_TAGS} from './operations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
// Import everything needed to use the `useQuery` hook



const Dashboard = () => {
    const { loading, error, data } = useQuery(
        GET_TAGS,
    );
    const [visibleTags, setVisibleTags] = useState([])

    const unhideTag = (tag) => {
        // remove from visible tags
        if(visibleTags.includes(tag)){
            setVisibleTags(visibleTags.filter(testTag => testTag !== tag));
        }else{
        // add to visible tags
            setVisibleTags([...visibleTags, tag])
            document.getElementById(tag).style.color = "lightgray";
        }
    }

    
    


    return <div className="App" style={{"display": "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", "width": "100%", "height": "100%"}}>
        <header style={{"display": "flex", "width": "100%", "backgroundColor": "whitesmoke", "alignItems": "center"}}>
                <img alt="dcdx logo" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" style={{"width": "auto", "maxHeight": "80px"}} />
        </header>
        
        <div className="row" style={{"display": "flex", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "center", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
            <div className="list" style={{"paddingRight": "10%"}}>
                <Table setVisibleItem={unhideTag} visibleTags={visibleTags}/>
                <div className='exportButton' style={{"display": "flex", "cursor": "pointer","alignItems": "center", "justifyContent": "center","padding": "0px 10px", "margin": "10px", "borderRadius": "15px", "fontSize": "15px"}}>
                    <p>export as .csv</p>
                    <FontAwesomeIcon style={{"padding": "0 5px 0 10px", "color": "#183153"}} icon={faFileExport} />
                </div>
            </div>
            <div className="charts">
                {loading ? <p> Loading... </p>:
                  <Chart filter={visibleTags.length > 0 ? {$or: visibleTags.map((tag) => (
                    {"hashtag": tag}))
                } : {}} chartId={'62bb62ba-852c-4661-88a5-6e06248f22bf'}/>
                }
              
            </div>
        </div>
    
    </div>
    };

export default Dashboard;