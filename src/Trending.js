import { useQuery } from '@apollo/client';
import { GET_PCT_CHANGES_ONE_DAY, GET_PCT_CHANGES_ONE_WEEK, GET_PCT_CHANGES_TWO_WEEKS, GET_PCT_CHANGES_ONE_MONTH } from './operations';
import './Trending.css';


const Trending = () => {

    const width = window.innerWidth * .6;
     

    var tzoffset = (new Date()).getTimezoneOffset() *  60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString(); 
    
    const today = localISOTime.substring(0,10).toString()

    const one_day_data = useQuery(
        GET_PCT_CHANGES_ONE_DAY, {
            variables: { today }
        }
    );

    const one_week_data = useQuery(
        GET_PCT_CHANGES_ONE_WEEK, {
            variables: { today }
        }
    );
    const two_weeks_data = useQuery(
        GET_PCT_CHANGES_TWO_WEEKS, {
            variables: { today }
        }
    );
    const one_month_data = useQuery(
        GET_PCT_CHANGES_ONE_MONTH, {
            variables: { today }
        }
    );

    return <div style={{
        "boxShadow": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", 
        "height": "400px", 
        "width": width,
        "backgroundColor": "white",
        "zIndex": "3",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "flex-start",
        "alignItems": "center",
        "marginBottom": "50px"
        }}>
            <h2 style={{"fontWeight": "normal", "fontSize": "25px"}}>Trending - % Change in 2 Weeks</h2>
            {/* THIS CONTAINS BOTH ROWS*/}
            <div style={{
                    "display": "flex", 
                    "flexDirection": "column", 
                    "justifyContent":"space-around", 
                    "alignItems":"flex-start",
                    "height": "100%",
                    "width": "100%"
                }}>

                {/* FIRST ROW */}
                <div style={{
                        "width": "100%",
                        "display": "flex", 
                        "justifyContent": "space-around",
                        "alignItems":"space-around", 
                        "height":"100%",
                        "borderTop":"solid lightgray 1px"
                    }}>
                    {two_weeks_data.loading ? <div>Loading Data... </div> 
                    :  two_weeks_data.error  ? 
                        <div>
                            unable to load data :(
                        </div>
                    : <div style={{
                        "width": "100%",
                        "display": "flex", 
                        "justifyContent": "space-around",
                        "alignItems":"space-around", 
                        "height": "100%",
                    }}>
                        {
                            two_weeks_data.data.metric_pct_changes.slice(0, 5).map((metric_obj, index) => 
                                <div className="trendingSquare" 
                                    style={{
                                        "display":"flex", 
                                        "flexDirection":"column", 
                                        "justifyContent":"center", 
                                        "height":"100%", "width":"20%"
                                    }}> 
                                    <div style={{"fontSize":"20px", "paddingBottom":"5px"}}>{ metric_obj.hashtag } </div>
                                    <div style={{"color":"gray"}}>{ Math.trunc(metric_obj.two_weeks * 100)}%</div>
                                </div>
                            )
                        }
                        </div>
                    }
                    
                </div>
                
                {/* SECOND ROW */}
                <div style={{
                        "width": "100%",
                        "display": "flex", 
                        "justifyContent": "space-around",
                        "alignItems":"space-around", 
                        "height":"100%",
                        "borderTop":"solid lightgray 1px"
                    }}>
                    {two_weeks_data.loading ? <div>Loading Data... </div> 
                    :  two_weeks_data.error  ? 
                        <div>
                            unable to load data :(
                        </div>
                    : <div style={{
                        "width": "100%",
                        "display": "flex", 
                        "justifyContent": "space-around",
                        "alignItems":"space-around",
                        "height": "100%",
                    }}>
                        {
                            two_weeks_data.data.metric_pct_changes.slice(5,10).map((metric_obj, index) => 
                                <div className="trendingSquare" 
                                    style={{
                                        "display":"flex", 
                                        "flexDirection":"column", 
                                        "justifyContent":"center", 
                                        "height":"100%", 
                                        "width":"20%"
                                    }}> 
                                    <div style={{"fontSize":"20px", "paddingBottom":"5px"}}>{ metric_obj.hashtag } </div>
                                    <div style={{"color":"gray"}}>{ Math.trunc(metric_obj.two_weeks * 100)}%</div>
                                </div>
                            )
                        }
                        </div>
                    }
                </div>
            </div>
    </div>
}

export default Trending;