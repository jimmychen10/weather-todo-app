


import React,{useState,useEffect} from "react"
import axios from "axios"

import WeatherDisplay from "./Components/WeatherDisplay.js"


export default function App(){
  // const weatherId = "9db9a4d3ba51b8e5bcb97f497a271e58"
  const weatherId ="d733b204b23441d5934886d9e788969e"
  const [loadingApi, setLoadingApi] = useState(true)
  const [weather,setWeather] = useState()
  const [city, setCity] = useState("Tokyo")
  const [currentCity,setCurrentCity] = useState(city)
  const [weatherData,setWeatherData] = useState({})

  // function getWeatherData(){
  //   setCurrentCity(city)
  //   console.log(city)
  //   axios.get("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+weatherId)
  //   .then(res => { 
  //     setWeather(res.data.weather[0].description) 
  //   })
  //   .catch(console.log);
  // }
  // https://api.weatherbit.io/v2.0/forecast/daily?days7&city=Raleigh,NC&key=d733b204b23441d5934886d9e788969e
  function getApiData(){
    // const apiData = axios.get("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+weatherId)
    const apiData = axios.get("https://api.weatherbit.io/v2.0/forecast/daily?days7&city="+city+"&key="+weatherId)
      if (apiData.ok){
        throw new ('HTTP error! status: ', apiData)
      }
      else{  
        
        return  apiData
        
      }
  }

  // async function getApiData(){
  //   const apiData =" "; 
  //   await axios.get("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+weatherId)
  //   .then(res =>{
  //     apiData = res.data
  //   })
  //    return apiData
  // }

   function getWeatherData(){

     getApiData().then( blob =>{
      
      
      // console.log(res.data.list[0].weather[0].description)
      setWeatherData(blob.data)
       // works
      // weatherData.map(p =>{
      //   console.log(p)
      // })
      setCurrentCity(blob.data.city_name)
      setWeather(blob.data.data[0].weather.description) 
      
      setLoadingApi(false)
      }
      )  

  }


  useEffect(()=>{
    console.log("Mounted")
    getWeatherData()
    return () => {
      console.log("cleaned up");
    };

  },[])


  function handleChange(e){
    e.preventDefault()
    getWeatherData()
    console.group(e)
  }

// setLoadingApi(true)
  
if(loadingApi){
  return <div> <h1>loading</h1></div>
}
else{

   return(
    
    <div>

{/*       
      <h1>city : {currentCity}</h1>
      <h1>{weather}</h1> */}
      
      
      <form onSubmit={handleChange}>
      <input type="text" placeholder ="city" value = {city} onChange ={e => setCity(e.target.value)} />
        <button type="submit" >
          Search
        </button>
      </form>
      {console.log("displaying...")}
      {console.log({weather})}    
    {console.log(loadingApi)}
     <WeatherDisplay weatherData = {weatherData}/>
      

    </div>
  )
    }

}
