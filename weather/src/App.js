import React,{useState,useEffect} from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/Weather.css"
import {Form,Button} from 'react-bootstrap';
import "./Styles/App.css"
import WeatherDisplay from "./Components/WeatherDisplay.js"
import UserLocation from './Components/UserLocation.js'
// import {geolocated} from 'react-geolocated';


export default function App(){
  // const weatherId = "9db9a4d3ba51b8e5bcb97f497a271e58"
  const weatherId ="d733b204b23441d5934886d9e788969e"
  const [loadingApi, setLoadingApi] = useState(true)
  const [weather,setWeather] = useState()
  const [city, setCity] = useState()
  const [currentCity,setCurrentCity] = useState(city)
  const [country,setCountry] = useState()
  const [currentCountry,setCurrentCountry] = useState()
  const [weatherData,setWeatherData] = useState({})


  function getApiData(){
    const apiData = axios.get("https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=7&city="+city+"&country="+country+"&key="+weatherId)
    console.log(typeof(apiData.ok))  
    if ( apiData.ok){
        console.log("throw error works")
        throw new ('HTTP error! status: ', apiData)
      }
      else{         
        return  apiData      
      }
  }

   function getWeatherData(){
      setCountry("")
      
      getApiData().then( blob =>{
        setWeatherData(blob.data)
        setCurrentCity(blob.data.city_name)
        
        setCurrentCountry(blob.data.country_code)
        // setWeather(blob.data.data[0].weather.description) 
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

  
if(loadingApi){
  return <div> <h1>loading</h1> </div>
}
else{

   return(
    
    <div className="backGround" >
      <div className = "searchedLocation">
      {weatherData !== "" ? <h1>{currentCity},{currentCountry}</h1>  :<h2>Please Type in a city or and the state </h2> }

      </div>
      
        <div className ="search">
          <span >
        <Form onSubmit={handleChange} >
          <Form.Group controlId="">
          <Form.Row className="d-flex justify-content-center">
            <Form.Control className=" form" type="text" placeholder="Enter City" value = {city} onChange ={e => setCity(e.target.value)} required/>
            <Form.Control className=" form" type="text" placeholder="Optional: Enter Country" value = {country}  onChange ={e => setCountry(e.target.value)}/>
            
            <Button variant="primary" type="submit" className="">
            Submit
            </Button>

            </Form.Row>
          </Form.Group>
          </Form>
          </span>
          </div>
    <div className = "displayWeather">
    { weatherData !== "" &&
      
      <WeatherDisplay weatherData = {weatherData}/>
    
    }

    </div>

     
      {/* <UserLocation/> */}

    </div>
  )
    }

}
