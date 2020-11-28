import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Weather(props){
    const weekDates = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday']
    const day = new Date(arrangeDate())

    function arrangeDate(){
        
        const dateFormated = props.date.split("-")
        console.log(dateFormated)
        let date = dateFormated[2]
        let year = dateFormated[0]
        let month = dateFormated[1]
        console.log(year+"-"+date+"-"+month)
        return(
             year+"-"+month+"-"+date
        )

    }
    console.log("day: "+ day.getDay())
    return(
        <div>
            <h2>{ weekDates[day.getDay()]}</h2>
            <img src={"https://www.weatherbit.io/static/img/icons/"+props.icon+".png"} alt=""/>
            
            
            <h2>{props.weatherDescription}</h2>
            <h2>{props.temperature}°F</h2>

        </div>

    )

}