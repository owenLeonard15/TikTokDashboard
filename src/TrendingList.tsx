/**
 * React component with a list of trending box components
 */

import React from 'react';
import { ApolloError } from '@apollo/client';
import { TrendingBox } from './TrendingBox.tsx';

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
  return (
      data.loading ? <div>Loading...</div> :
        <div className="trending-list" style={{"display": "flex", "flexWrap": "wrap", "justifyContent": "space-evenly", "width": "100%"}}>
            { 
            data.data.metric_pct_changes.slice(0, 100).map((metric_obj, index) =>
                <TrendingBox key={index} order_number={index} metric_obj={metric_obj} time_frame={time_frame} time_frame_key={time_frame_key} />
              )
            }
        </div>
    )
}
