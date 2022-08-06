import './Dashboard.css';
import Table from './Table.js';
import Chart from "./Chart";
import { useQuery} from '@apollo/client';
import { GET_METRICS} from './operations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { ExportToCsv } from 'export-to-csv';

const current = new Date();
const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

const csvOptions = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: ('TikTok Hashtag Views as of ' + date),
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };

const csvExporter = new ExportToCsv(csvOptions);




const Dashboard = () => {
    const [selectValue, setSelectValue] = useState("")
    const [dateFilter, setDateFilter ] = useState("")
    const { loading, error, data } = useQuery(
        GET_METRICS,
    );
    const [visibleTags, setVisibleTags] = useState([])
    const dateOptions = [
        {label: 'All Time', value: "100000"}, 
        {label: 'Last Year', value: 365},
        {label: 'Last 6 Months', value: 180},
        {label: 'Last 1 Month', value: 30},
        {label: 'Last 2 Weeks', value: 14},
        {label: 'Last 1 Week', value: 7},

    ]

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


    const exportCSV = () => {  
        csvExporter.generateCsv(data.metrics);
    }


    const changeSelectValue = e => {
        setSelectValue(e.target.value)
        const currentDate = new Date();
        const priordate =  new Date(currentDate.setDate(currentDate.getDate() - e.target.value));
        setDateFilter(priordate.toISOString().substring(0,10).toString())
    }
    


    return <div className="App" style={{"display": "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", "width": "100%", "height": "100%"}}>
        <header style={{"display": "flex", "width": "100%", "backgroundColor": "whitesmoke", "alignItems": "center"}}>
                <img alt="dcdx logo" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" style={{"width": "auto", "maxHeight": "80px"}} />
        </header>
        
        <div className="row" style={{"display": "flex", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "center", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
            <div className="list" style={{"paddingRight": "10%"}}>
                <Table setVisibleItem={unhideTag} visibleTags={visibleTags}/>
                <div onClickCapture={exportCSV} className='exportButton' style={{"display": "flex", "cursor": "pointer","alignItems": "center", "justifyContent": "center","padding": "0px 10px", "margin": "10px", "borderRadius": "15px", "fontSize": "15px"}}>
                    <p >export as .csv</p>
                    <FontAwesomeIcon style={{"padding": "0 5px 0 10px", "color": "#183153"}} icon={faFileExport} />
                </div>
            </div>
            <div className="charts">
                {loading ? <p> Loading... </p>:
                  <Chart filter={visibleTags.length > 0 ? {$or: visibleTags.map((tag) => (
                    {
                        "hashtag": tag,
                        "date": {$gte: dateFilter}
                    }))
                } : {
                    "date": {$gte: dateFilter} 
                }} chartId={'62bb62ba-852c-4661-88a5-6e06248f22bf'}/>
                }
              
            </div>
            <div style={{"width": "100%"}}>
                <label style={{"display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center", "color": "white", "paddingRight": "20px"}}>
                    <h3 style={{"paddingRight": "10px"}}>Date Filter: </h3>
                    <select value={selectValue} onChange={changeSelectValue}>
                        {dateOptions.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    
    </div>
    };

export default Dashboard;