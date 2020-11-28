import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../Styles/Weather.css"

import Weather from "./Weather.js"


export default function WeatherDisplay(props){
    const temp = props.weatherData.data[0]
    const weekDisplay = props.weatherData.data.map( i =>{
        return(
        <div className="weeklyWeatherDisplay">    
            <Weather icon = {i.weather.icon} temperature = {i.temp} weatherDescription = {i.weather.description} date = {i.valid_date}/>
        </div>
        )
    })
    return(
        <div className="d-flex flex-column">
            <div  className="d-flex justify-content-center">
                <div className="weatherBox">
                    <Weather icon = {temp.weather.icon} date = {temp.valid_date} temperature = {temp.temp} weatherDescription = {temp.weather.description}/>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                {weekDisplay}
            </div>
        </div>
    )
} 