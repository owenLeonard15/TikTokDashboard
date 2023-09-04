import './Trending.css';
import * as React from 'react';
import { ApolloError } from '@apollo/client';


export interface TrendingRowProps {
  unhideTag: (e: React.MouseEvent<HTMLDivElement>, hashtag: string) => void;
  data: {
    loading: boolean;
    error?: ApolloError | undefined;
    data: {
      metric_pct_changes: Array<{hashtag: string}>;
    };
  };
  titleString: string;
  object_key: string;
}

export const TrendingRow = (
  {
    unhideTag,
    data,
    titleString,
    object_key
  }: TrendingRowProps
) => {
  const width = window.innerWidth * .6;

  const validateData = (inputData: any) => {
    
  }


  return (
    <div style={{
      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
      height: "400px",
      width: width,
      backgroundColor: "#1d2631",
      zIndex: "3", 
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: "50px",
      borderTop: "1px solid lightgray",
      borderRadius: "5px"
    }}>
      <h2 style={{ fontWeight: "normal", fontSize: "25px", color: "white" }}>Trending - % Change in {titleString}</h2>
      {/* THIS CONTAINS BOTH ROWS*/}
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        height: "100%",
        width: "100%"
      }}>

        {/* FIRST ROW */}
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-around",
          height: "100%",
          borderTop: "solid lightgray 1px"
        }}>
          {data.loading ? <div>Loading Data... </div>
            : data.error ?
              <div>
                unable to load data :(
              </div>
              : <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "space-around",
                height: "100%",
              }}>
                {
                  data.data.metric_pct_changes.slice(0, 5).map((metric_obj, index) =>
                    <div className="trendingSquare" key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        height: "100%", width: "20%"
                      }}
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => unhideTag(e, metric_obj.hashtag)}>
                      <div style={{ fontSize: "20px", paddingBottom: "5px" }}>{metric_obj.hashtag} </div>
                      <div style={{ color: "gray" }}>{Math.trunc(metric_obj[object_key] * 100)}%</div>
                    </div>
                  )
                }
              </div>
          }

        </div>

        {/* SECOND ROW */}
        <div style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-around",
          height: "100%",
          borderTop: "solid lightgray 1px"
        }}>
          {data.loading ? <div>Loading Data... </div>
            : data.error ?
              <div>
                unable to load data :(
              </div>
              : <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems:"space-around",
                "height": "100%",
            }}>
                {
                    data.data.metric_pct_changes.slice(5,10).map((metric_obj, index) => 
                        <div className="trendingSquare" key={index}
                            style={{
                                "display":"flex", 
                                "flexDirection":"column", 
                                "justifyContent":"center", 
                                "height":"100%", 
                                "width":"20%"
                            }}
                            onClick={e => unhideTag(e, metric_obj.hashtag)}> 
                            <div style={{"fontSize":"20px", "paddingBottom":"5px"}}>{ metric_obj.hashtag } </div>
                            <div style={{"color":"gray"}}>{ Math.trunc(metric_obj[object_key] * 100)}%</div>
                        </div>
                    )
                }
                </div>
            }
        </div>
    </div>
</div>
  )
}