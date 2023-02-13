import { useQuery } from '@apollo/client';
import { GET_PCT_CHANGES_ONE_DAY, GET_PCT_CHANGES_ONE_WEEK, GET_PCT_CHANGES_TWO_WEEKS, GET_PCT_CHANGES_ONE_MONTH } from './operations';
import './Trending.css';
import TrendingRow from './TrendingRow';


const Trending = ({ unhideTag }) => {

     

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

    return <div>
            <TrendingRow titleString={"1 Day"} unhideTag={unhideTag} data={one_day_data} object_key={"one_day"}/>
            <TrendingRow titleString={"1 Week"} unhideTag={unhideTag} data={one_week_data} object_key={"one_week"}/>
            <TrendingRow titleString={"2 Weeks"} unhideTag={unhideTag} data={two_weeks_data} object_key={"two_weeks"}/>
            <TrendingRow titleString={"1 Month"} unhideTag={unhideTag} data={one_month_data} object_key={"one_month"}/>
        </div>
}

export default Trending;