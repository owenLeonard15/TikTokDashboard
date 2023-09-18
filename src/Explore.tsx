import React from "react";
import { useState } from "react";
import { Trending } from "./Trending.tsx";


export const Explore = () => {

    const [trendingValue, setTrendingValue] = useState({label: '1 Week', value: "one_week"})

    const trendingOptions = [
        {label: '1 Week', value: "one_week"},
        {label: '2 Weeks', value: "two_weeks"},
        {label: '1 Month', value: "one_month"},
        {label: '3 Months', value: "three_months"},
        {label: '6 Months', value: "six_months"},
        {label: '1 Year', value: "one_year"}
    ]

    const changeTrendingValue = newVal => {
        console.log(newVal)
        setTrendingValue(newVal)
    }


    return(
        <div className="row" style={{"display": "flex", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap", "alignItems": "center"}}>
            <div style={{"display": "flex", "flexDirection": "row", "height": "100%", "width": "100%", "justifyContent": "space-around", "flexWrap": "wrap", "alignItems": "center"}}>
                <h1 style={{"fontStyle": "italic", "fontWeight": "bold"}}>Discover What's Trending</h1>
                <div style={{"display": "flex", "paddingTop": "50px", "flexDirection": "row", "alignItems": "center", "justifyContent": "center", "textAlign": "center"}}>
                    {
                        trendingOptions.map((option) => 
                            <div onClick={() => changeTrendingValue(option)}key={option.label} className="option-item" style={{"backgroundColor": option.label === trendingValue.label ? "rgba(175, 175, 175, 1)" : "rgba(229, 229, 229, 1)"}}>
                                <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"space-between"}}>
                                    <p style={{"display": "flex", "overflowWrap": "false"}}>
                                        {option.label}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>  
            </div>                              
            <Trending  style={{"paddingTop": "50px"}}  selectedTag={trendingValue.value}/>
        </div>          
    )  
}