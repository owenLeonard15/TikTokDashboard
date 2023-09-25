import React from 'react';
import { useQuery } from '@apollo/client';
import { 
    GET_PCT_CHANGES_ONE_DAY, 
    GET_PCT_CHANGES_ONE_WEEK,
    GET_PCT_CHANGES_TWO_WEEKS, 
    GET_PCT_CHANGES_ONE_MONTH,
    GET_PCT_CHANGES_THREE_MONTHS,
    GET_PCT_CHANGES_SIX_MONTHS,
    GET_PCT_CHANGES_ONE_YEAR
 } from './operations';
import './Trending.css';
import { useState } from 'react';
// import {TrendingRow} from './TrendingRow.tsx';
import { TrendingList } from './TrendingList.tsx';


export const Trending = ({ selectedTag }) => {
    

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
    const three_months_data = useQuery(
        GET_PCT_CHANGES_THREE_MONTHS, {
            variables: { today }
        }
    );
    const six_months_data = useQuery(
        GET_PCT_CHANGES_SIX_MONTHS, {
            variables: { today }
        }
    );
    const one_year_data = useQuery(
        GET_PCT_CHANGES_ONE_YEAR, {
            variables: { today }
        }
    );

    return <div style={{width: "100%"}}>
            { selectedTag === "one_day" ? <TrendingList data={one_day_data}  time_frame={"one day"} time_frame_key={"one_day"} /> : null }
            { selectedTag === "one_week" ?<TrendingList data={one_week_data}  time_frame={"one week"} time_frame_key={"one_week"} /> : null }
            { selectedTag === "two_weeks" ?<TrendingList data={two_weeks_data}  time_frame={"two weeks"} time_frame_key={"two_weeks"} /> : null } 
            { selectedTag === "one_month" ?<TrendingList data={one_month_data}  time_frame={"one month"} time_frame_key={"one_month"} /> : null } 
            { selectedTag === "three_months" ?<TrendingList data={three_months_data}  time_frame={"three months"} time_frame_key={"three_months"} /> : null }
            { selectedTag === "six_months" ?<TrendingList data={six_months_data}  time_frame={"six months"} time_frame_key={"six_months"} /> : null }
            { selectedTag === "one_year" ?<TrendingList data={one_year_data}  time_frame={"one year"} time_frame_key={"one_year"} /> : null }
        </div>
}