/**
 * React component with a list of trending box components
 */

import React, { useEffect, useState } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { TrendingBox } from './TrendingBox.tsx';
import { GET_VIEWS } from './operations.js';

export interface TrendingListProps {
    data: {
      loading: boolean;
      error?: ApolloError | undefined;
      data: {
        metric_pct_changes: Array<{hashtag: string}>;
      };
    };
    time_frame: string;
    time_frame_key: string;
  }

export const TrendingList = ({data, time_frame, time_frame_key}: TrendingListProps) => {    

// state variable trend objects is the list of metric_pct_changes objects with an additional key of views for the current day
interface TrendObject {
  hashtag: string;
  views: number;
}

const [trendObjects, setTrendObjects] = useState<TrendObject[]>([]);
const [currentTags, setCurrentTags] = useState<string[]>([]);

useEffect(() => {
  if(!data.loading){
    setCurrentTags(data.data.metric_pct_changes.map((metric_obj) => metric_obj.hashtag));
  }
}, [data])




var tzoffset = (new Date()).getTimezoneOffset() *  60000; //offset in milliseconds
var localISOTime = (new Date(Date.now() - tzoffset)).toISOString(); 
const today = localISOTime.substring(0,10).toString()



const view_counts = useQuery(
    GET_VIEWS, {
      variables: { today, currentTags }
    }
)

// when view_counts is loaded, set the trendObjects state variable to the metric_pct_changes objects with an additional key of views for the current day
// basically a join of the metric_pct_changes and views objects
useEffect(() => {
  if(!view_counts.loading && view_counts.data.metrics.length > 0){
      setTrendObjects(data.data.metric_pct_changes.map((metric_obj) => {
        let matching_view_obj = view_counts.data.metrics.find((metric_view_obj) => metric_view_obj.hashtag === metric_obj.hashtag);
        if(matching_view_obj !== undefined){
          return {...metric_obj, views: view_counts.data.metrics.find((metric_view_obj) => metric_view_obj.hashtag === metric_obj.hashtag).views}
        }else{
          return {...metric_obj, views: "loading..."}
        }
    }));
  }
}, [view_counts])

useEffect(() => { 
  console.log("Trend objects: ", trendObjects)
}, [trendObjects])

    return (
        data.loading || trendObjects === null ? <div>Loading...</div> :
          trendObjects.length === 0 ? <div style={{paddingTop: "50px"}}>No trending hashtags available for this period due 
            to missing total view count data {time_frame} ago </div> :
          <div className="trending-list" style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-evenly", "width": "100%"}}>
              { 
              trendObjects.map((metric_obj, index) =>
                  <TrendingBox key={index} order_number={index} metric_obj={metric_obj} time_frame={time_frame} time_frame_key={time_frame_key}/>
                )
              }
          </div>
      )
  }
