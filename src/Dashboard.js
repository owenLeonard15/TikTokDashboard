import './Dashboard.css';
import TagSearchBar from './TagSearchBar.js';
import Chart from "./Chart";
import Trending from './Trending';
import ExportButton from './ExportButton.js';
import { useQuery, useMutation} from '@apollo/client';
import { ADD_TAG, GET_TAGS} from './operations';
import { useEffect, useState } from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './TagSearch.css';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }



const Dashboard = () => {
    const [selectValue, setSelectValue] = useState(100000)
    const [dateFilter, setDateFilter ] = useState(new Date("01-01-2022"))
    const [curChart, setCurChart] = useState({label: "Total", chartId: "62bb62ba-852c-4661-88a5-6e06248f22bf"})
   
    const { loading, error, data} = useQuery(
        GET_TAGS
    );

    const [ mutateAddTag ] = useMutation(
        ADD_TAG,
        {
            update (cache, { data }) {
                const newTagFromResponse = data?.insertOneHashtag;
                const existingTags = cache.readQuery({
                    query: GET_TAGS,
                });
                
                cache.writeQuery({
                    query: GET_TAGS,
                    data: {
                        hashtags: [
                            ...existingTags?.hashtags,
                            newTagFromResponse,
                        ],
                    },
                });
            }
        }
    )

     // const [mutateDeleteTag, resDeleteTagData] = useMutation(
    //     DELETE_TAG,
    //     {
    //         refetchQueries: [
    //             {query: GET_TAGS},
    //             'GetTags'
    //         ],
    //     }
    // );  

    // const [mutateDeleteTagMetrics, resDeleteTagMetricsData] = useMutation(
    //     DELETE_TAG_METRICS,
    // )


    // const handleDelete = () => {
    //     if(inText){
    //         mutateDeleteTag({
    //             variables: { inText }
    //         })
            
    //         const res = mutateDeleteTagMetrics({
    //             variables: { inText }
    //         })
    //         setInText("")
    //     }
    // }
    
    const [isFocused, setIsFocused] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [hashtagList, setHashtagList] = useState([])
    

    const [visibleTags, setVisibleTags] = useState(["genz"])
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
        function handleResize() {
          setWindowDimensions(getWindowDimensions());
        }
            
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

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

    const unhideTag = (event, tag) => {
        // remove from visible tags
        if(visibleTags.includes(tag)){
            setVisibleTags(visibleTags.filter(testTag => testTag !== tag));
        }else{
        // add to visible tags
            setVisibleTags([...visibleTags, tag])
            setSearchText("")
        }
    }

    const handleFocused = (e) => {
        setIsFocused(true)
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
        setHashtagList(data ? data.hashtags.reduce(function(acc, obj){
            if(obj.hashtag.startsWith(e.target.value) && !visibleTags.includes(obj.hashtag)){
                acc.push(obj.hashtag)
            }
            return acc
        }, []): null)
        console.log(hashtagList)
    }

    const handleSubmit = () => {
        let existingTags = data.hashtags.map(hashtagObj => hashtagObj.hashtag)
        if (existingTags.includes(searchText)){
            setSearchText("")
            setIsFocused(false)
        }

        if (searchText && !existingTags.includes(searchText)){
            mutateAddTag({
                variables: { searchText }
            })
            setSearchText("")
            setIsFocused(false)
        }
    }


    const changeSelectValue = newVal => {
        setSelectValue(newVal)
        const currentDate = new Date();
        const priordate =  new Date(currentDate.setDate(currentDate.getDate() - newVal.value));
        setDateFilter(new Date(priordate.toISOString().substring(0,10).toString()))
    }


   const changeChartValue = newValObj => {
        let res = chartOptions.filter(option => option.label === newValObj.label)
        setCurChart(res[0])
    }   


    return loading ? <div>LOADING DATA... </div> :
        <div style={{
                "display": "flex", 
                "alignItems": "center", 
                "justifyContent": "center", 
                "flexDirection": "column", 
                "width": "100%", 
                "margin": "0", 
                "top": "0"
        }}>

        <div style={{"display": "flex", "flexDirection": "column", "width": "100%", "height": "100%", "justifyContent": "center", "alignItems": "center", "backgroundColor": "white", "boxShadow": "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
            <div className="menu-container">
            {
                    visibleTags.map((tag) => 
                        <div key={tag} className="menu-item" style={{"height": "100%", "margin": "0", "borderRight": "solid 1px lightgray"}}>
                            <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-around"}}>
                                <p style={{"visibility":"hidden"}}>X</p>
                                <p>{tag}</p>
                                {
                                    visibleTags.length > 1 
                                    ? <p className="X" onClick={e => unhideTag(e, tag)}>X</p>
                                    : <p style={{"visibility":"hidden"}}>X</p>
                                }
                            </div>
                        </div>
                    )
                }
                {visibleTags.length < 5 ? <div style={{"display": "flex", "width": "100%", "justifyContent": "center"}} className="menu-item">
                    <TagSearchBar 
                        style={{"width": "100%"}}
                        visibleTags={visibleTags} 
                        handleFocused={handleFocused} 
                        handleSearchChange={handleSearchChange} 
                        searchText={searchText}
                        isFocused={isFocused}
                    />
                    {isFocused ? 
                            <ul >    
                                {data ? data.hashtags.reduce(function(acc, obj){
                                    if(obj.hashtag.startsWith(searchText) && !visibleTags.includes(obj.hashtag)){
                                        acc.push(
                                        <li key={obj.hashtag} className='select-search-option' onMouseDown={e => unhideTag(e, obj.hashtag)}>
                                            {obj.hashtag}
                                        </li>)
                                    }
                                    return acc
                                }, []): null}
                                {!hashtagList.includes(searchText) && !visibleTags.includes(searchText) && searchText.length > 0 ?
                                    <div style={{
                                        "width": "100%",
                                        "fontSize": "16px",
                                        "margin": "0 auto 0 auto",
                                        "borderRadius": "5px",
                                        "display": "flex", 
                                        "justifyContent":"flex-start"
                                    }}>
                                        <p className="submitIcon" onClick={handleSubmit}>+ Add "{searchText}" to database</p>
                                    </div>
                                    : null
                                }
                            </ul>
                        :  null
                         }
                </div> : null}
                
            </div>
            <div style={{"marginTop": "10px", "marginBottom": "10px", "display": "flex", "justifyContent": "center", "flexDirection": "row"}}>
                <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "textAlign": "center"}} >
                    <Dropdown
                        options={dateOptions}
                        onChange={value => changeSelectValue(value)}
                        value={selectValue.label}
                        placeholder="All Time"
                        className='dropdown'
                    />
                </div>
                <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}} >
                    <Dropdown
                        options={chartOptions}
                        onChange={value => changeChartValue(value)}
                        value={curChart.label}
                        placeholder="Total"
                        className='dropdown'
                    />
                </div>
            </div>
        </div>
        
        <div className="row" style={{"display": "flex", "paddingTop": "30px", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
            <div className='leftColumn'>
                <ExportButton currentTags={visibleTags}/>
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
            <div className='rightColumn'>
            </div>
        </div>
        
        <div className="row" style={{"display": "flex", "paddingTop": "30px", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
            <div className='leftColumn' style={{"visibility": "hidden"}}>
                <ExportButton currentTags={visibleTags}/>
            </div>
                <Trending  style={{"paddingTop": "20px"}} unhideTag={unhideTag} />
            <div className='rightColumn'>
            </div>
        </div>
    
    </div>
    };

export default Dashboard;