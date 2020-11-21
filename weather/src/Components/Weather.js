import React from "react"


export default function Weather(props){

    return(
        <div>
            {/* <img src={props.icon} alt=""/> */}
            <h2>{props.temperature}</h2>
            <h2>{props.weatherDescription}</h2>
        </div>

    )

}