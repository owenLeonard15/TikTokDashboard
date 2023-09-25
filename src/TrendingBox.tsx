/**
 * A react component which is a box containing which displays the index of the trending hashtag, 
 *  the hashtag itself, and the percentage change in the metric
 */

import React from 'react';
import { ApolloError } from '@apollo/client';
import './TrendingBox.css';
import { time } from 'console';

export interface TrendingBoxProps {
    order_number: number;
    metric_obj: {
        hashtag: string;
        views: number;
    };
    time_frame: string;
    time_frame_key: string;
}

export const TrendingBox = ({order_number, metric_obj, time_frame, time_frame_key}: TrendingBoxProps) => {

    // function for mapping a views number to a formatted string
    // examples: 1000 -> 1,000 | 1000000 -> 1M | 1000000000 -> 1B
    const formatViews = (views: number) => {
        if(views >= 1000000000){
            return (views/1000000000).toFixed(1) + "B"
        }else if(views >= 1000000){
            return (views/1000000).toFixed(1) + "M"
        }else if(views >= 1000){
            // for thousands, insert a comma
            return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }else{
            return views.toString()
        }
    }
    
    
    return (
        metric_obj[time_frame_key] >= 0  ? 
        <div className="trending-box">
            <div className="trending-box-index" style={{width:  order_number === 99 ? "156px" : "106px"}}>
                #{order_number+1}
            </div>
            <div className="trending-box-text">
                <div className="trending-box-hashtag">
                    #{metric_obj.hashtag}
                </div>
                <div className="trending-box-pct-change">
                    {Math.round(metric_obj[time_frame_key] * 100)}% increase in {time_frame}
                </div>
                <div className="trending-box-total">
                    total views: {formatViews(metric_obj.views)}
                </div>
            </div>
        </div>
        : null
    )
}