import './Dashboard.css';
import {TagSearchBar} from './TagSearchBar.tsx';
import Chart from "./Chart";
import MultiLineChart from './MultiLineChart.tsx';
import {Trending} from './Trending.tsx';
import {ExportButton} from './ExportButton.tsx';
import { useQuery, useMutation} from '@apollo/client';
import { ADD_TAG, GET_TAGS} from './operations';
import { useEffect, useState } from 'react';
import { Button } from '@aws-amplify/ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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



const Dashboard = ({signOut}) => {
    const [selectValue, setSelectValue] = useState({label: 'All Time', value: 100000})
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
        {label: '1 Year', value: 365},
        {label: '6 Months', value: 180},
        {label: '1 Month', value: 30},
        {label: '2 Weeks', value: 14},
        {label: '1 Week', value: 7},
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
        <>
            <div style={{"height": "75px", "display": "flex", "justifyContent": "space-between", "flexDirection": "row", "width": "100%", "alignItems": "center", "backgroundColor": isFocused && searchText.length > 0 ? "rgba(217, 217, 217, 0.75)" : "rgba(217, 217, 217, 0.1)", "zIndex": "1"}}>
                <div style={{"display": "flex", "flexDirection":"row", "alignItems": "center"}}>
                <img style={{"width": "auto", "maxHeight": "80px", "padding": "10px"}} alt="dcdx logo" src="https://images.squarespace-cdn.com/content/v1/5b1bb66e25bf023fcbe92110/b27e8c59-ec3e-49ef-9792-f7b9de91272a/websitelogodcdx.png?format=1500w" />
                {/* {user.attributes.email.split('@')[1] === "dcdx.co" ? 
                    <Button onClick={() => setAdminSelected(!adminSelected)} style={{"marginRight": "-10px", "fontWeight":"normal", "background": "lightlightgray"}} variation='default'>
                        {!adminSelected ? "Admin Dashboard" : "Home"}
                    </Button> 

                    : null} */}
                {visibleTags.length < 16 ? <div style={{"display": "flex", "width": "100%", "justifyContent": "center"}} className="menu-item">
                    <TagSearchBar 
                        style={{"width": "100%"}}
                        visibleTags={visibleTags} 
                        handleFocused={handleFocused} 
                        handleSearchChange={handleSearchChange} 
                        searchText={searchText}
                        isFocused={isFocused}
                    />
                    {isFocused || searchText.length > 0 ? 
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
                                    <li className='select-search-option' style={{"overflowWrap": "false", "display": "flex", "flexWrap":"nowrap"}} onClick={handleSubmit}>
                                        + Add <div style={{"fontStyle": "italic"}}>&nbsp;{searchText}&nbsp;</div> to database
                                        {/* <p className="submitIcon" ></p> */}
                                    </li>
                                    : null
                                }
                            </ul>
                        :  null
                         }
                    </div> : null}
                </div>
                
                <Button variation="primary" style={{"marginRight": "10px", "fontWeight":"normal", "minWidth": "150px"}} onClick={signOut}>Sign out</Button>
            </div>
            <div style={{
                "display": "flex", 
                "alignItems": "center", 
                "justifyContent": "center", 
                "flexDirection": "column", 
                "width": "100%", 
                "margin": "0", 
                "top": "0"
        }}>
        {/* <Header signOut={signOut} isSearchFocused={false} /> */}

        
        
        <div className="row" style={{"display": "flex", "paddingTop": "30px", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
            <div className='leftColumn' style={{ "flexBasis": "25%"}}>
                <div style={{"display": "flex", "justifyContent": "space-around", "flexDirection": "row", "width":"100%"}}>
                    <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "textAlign": "center"}}>
                        {
                            dateOptions.map((option) => 
                                <div onClick={() => changeSelectValue(option)}key={option.label} className="option-item" style={{"backgroundColor": option.label === selectValue.label ? "rgba(175, 175, 175, 1)" : "rgba(229, 229, 229, 1)"}}>
                                    <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"space-between"}}>
                                        <p style={{"marginRight": "10px", "display": "flex", "overflowWrap": "false"}}>
                                            {option.label}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "textAlign": "center"}} >
                        <Dropdown
                            options={dateOptions}
                            onChange={value => changeSelectValue(value)}
                            value={selectValue.label}
                            placeholder="All Time"
                            className='dropdown'
                        />
                    </div> */}
                    <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "textAlign": "center"}}>
                        {
                            chartOptions.map((option) => 
                                <div onClick={() => changeChartValue(option)} key={option.label} className="option-item" style={{"backgroundColor": option.label === curChart.label ? "rgba(175, 175, 175   , 1)" : "rgba(229, 229, 229, 1)"}}>
                                    <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"space-between"}}>
                                        <p style={{"marginRight": "10px", "display": "flex", "overflowWrap": "false"}} >
                                            {option.label}
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    {/* <div style={{"display": "flex", "flexDirection": "row", "alignItems": "center", "justifyContent": "center"}} >
                        <Dropdown
                            options={chartOptions}
                            onChange={value => changeChartValue(value)}
                            value={curChart.label}
                            placeholder="Total"
                            className='dropdown'
                        />
                    </div> */}
                </div>
            </div>
            
            <div className='rightColumn' style={{"flexBasis": "65%", "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "paddingRight": "5%"}}>
                <div style={{"display": "flex", "flexDirection": "column", "width": "100%", "height": "100%"}}>
                    <div className="menu-container">
                    {
                            visibleTags.map((tag) => 
                                <div key={tag} className="menu-item" style={{"height": "100%", "flexBasis": "25px", "margin": "10px", "padding": "0 15px", "borderRadius": "20px", "backgroundColor": "rgba(229, 229, 229, 1)"}}>
                                    <div style={{"display":"flex", "flexDirection":"row", "justifyContent":"space-between", "alignItems":"center"}}>
                                        <p style={{"marginRight": "10px", "fontStyle": "italic", "display": "flex", "overflowWrap": "false"}}>#{tag}</p>
                                        {
                                            visibleTags.length > 1 
                                            ? 
                                            <FontAwesomeIcon icon={faXmark} className="X"  onClick={e => unhideTag(e, tag)}/>
                                            : <FontAwesomeIcon style={{"visibility":"hidden"}} icon={faXmark} className="X"  onClick={e => unhideTag(e, tag)}/>

                                        }
                                    </div>
                                </div>
                            )
                        }
                        
                        
                    </div>
                    <div className="charts" style={{"width":"100%"}}>

                        {/* <MultiLineChart 
                            data={visibleTags}
                            width={500}
                            height={400}
                        /> */}
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
                <ExportButton currentTags={visibleTags}/>
            </div>
        </div>
        
        <div className="row" style={{"display": "flex", "paddingTop": "30px", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap-reverse", "alignItems": "center"}}>
                <Trending  style={{"paddingTop": "20px"}} unhideTag={unhideTag} />
        </div>
    
    </div>
        </>
        
    };

export default Dashboard;