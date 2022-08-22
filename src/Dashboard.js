import './Dashboard.css';
import Table from './Table.js';
import Chart from "./Chart";
import { useQuery} from '@apollo/client';
import { GET_METRICS} from './operations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
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
    const [selectValue, setSelectValue] = useState(100000)
    const [dateFilter, setDateFilter ] = useState("")
    const [curChart, setCurChart] = useState({label: "Total", chartId: "62bb62ba-852c-4661-88a5-6e06248f22bf"})
    const { loading, error, data } = useQuery(
        GET_METRICS,
    );

    const [visibleTags, setVisibleTags] = useState([])
    const dateOptions = [
        {label: 'All Time', value: 100000}, 
        {label: '1Y', value: 365},
        {label: '6M', value: 180},
        {label: '1M', value: 30},
        {label: '2W', value: 14},
        {label: '1W', value: 7},
    ]

    const chartOptions = [
        {label: "Total", chartId: "62bb62ba-852c-4661-88a5-6e06248f22bf"},
        {label: "%1M", chartId: "521acd84-1415-4121-b08e-345ff7283f8b"},
        {label: "%2W", chartId: "dc50b809-0118-472a-8439-5f596a5a8030"},
        {label: "%1W", chartId: "62febdf8-2abb-4832-89d4-de5fcc20c1f6"},
        {label: "%1D", chartId: "d6330087-5673-425b-b3d4-6aa5c559e5a5"}
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


    const changeSelectValue = newVal => {
        setSelectValue(newVal)
        const currentDate = new Date();
        const priordate =  new Date(currentDate.setDate(currentDate.getDate() - newVal));
        setDateFilter(priordate.toISOString().substring(0,10).toString())
    }


   const changeChartValue = newValObj => {
        setCurChart(newValObj)
    }



    return <div className="App" style={{"display": "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", "width": "100%", "height": "100%"}}>
        <header style={{"display": "flex", "width": "100%", "justifyContent": "center", "alignItems": "center"}}>
            <img style={{"position": "absolute", "top": "10px", "left": "10px", "width": "auto", "maxHeight": "80px"}} alt="dcdx logo" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" />
            <div style={{"display": "flex", "justifyContent": "flex-end", "flexDirection": "column"}}>
                <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start"}}>
                    <p className='buttonTitle'>Sample Window</p>
                    {dateOptions.map((option) => (
                        option.value === selectValue ?
                        <p key={option.value} className="timeButton" onClick={() => changeSelectValue(option.value)} style={{"padding": "15px", "margin": "0 10px 10px 10px", "fontWeight": "bold", "color": "white", "borderRadius": "10px", backgroundColor: "#25518f"}}>{option.label}</p>
                        : <p key={option.value} className="timeButton" onClick={() => changeSelectValue(option.value)} style={{padding: "15px", margin: "0 10px 10px 10px", borderRadius: "10px", backgroundColor: "#25518f"}}>{option.label}</p>

                    ))}
                </div>
                <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start"}}>
                    <p className='buttonTitle'>Chart Type</p>
                    {chartOptions.map((option) => (
                        option.label === curChart.label ?
                        <p key={option.label} className="timeButton" onClick={() => changeChartValue(option)} style={{"padding": "15px", "margin": "0 10px 0 10px", "fontWeight": "bold", "color": "white", "borderRadius": "10px", backgroundColor: "#25518f"}}>{option.label}</p>
                        : <p key={option.label} className="timeButton" onClick={() => changeChartValue(option)} style={{padding: "15px", margin: "0 10px 0 10px", borderRadius: "10px", backgroundColor: "#25518f"}}>{option.label}</p>

                    ))}
                </div>
            </div>
            
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
                }} chartId={curChart.chartId}/>
                }
              
            </div>
        </div>
    
    </div>
    };

export default Dashboard;