import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from "./Weather.js"


export default function WeatherDisplay(props){
    // const temp = props.weatherData.list[0].weather[0]
    const temp = props.weatherData.data[0]
    // const weekDisplay = props.weatherData.map( i =>{
    //     <Weather 
    //     // key = {} 
    //     icon = {i.weather[0].icon}
    //     temperature = {i.main.temp}
    //     weatherDescription = {i.weather[0].description}
    //     />
    // })
    console.log(temp)
    console.log("HI :D")

    return(

        <div>
            <Weather icon = {temp.weather.icon} temperature = {temp.temp} weatherDescription = {temp.weather.description}/>
{/* 
            {weekDisplay} */}
        </div>

    )

} 