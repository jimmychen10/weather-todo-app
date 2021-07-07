import WeatherDisplay from "./Components/WeatherDisplay.js"
import LoadingIndicator from "./Components/LoadingIndicator.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/Weather.css"
import "./Styles/App.css"

import {Form,Button} from 'react-bootstrap';
import { BsGeoAlt } from 'react-icons/bs';

import React,{useState,useEffect} from "react"
import axios from "axios"


export default function App(){
  // const weatherId = "9db9a4d3ba51b8e5bcb97f497a271e58" for OpenWeather

  let wantLogLan = false
  let loadingApi = false
  let lon,lan;
  const weatherId ="d733b204b23441d5934886d9e788969e"

  const [city, setCity] = useState()
  const [currentCity,setCurrentCity] = useState(city)
  const [country,setCountry] = useState()
  const [currentCountry,setCurrentCountry] = useState()
  const [weatherData,setWeatherData] = useState("")


  async function getApiData(){

    let apiData;
    try {
      const temp = (country === undefined ? "": "&country="+country)
      if(wantLogLan){
        apiData = await axios.get("https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=7&lat="+lan+"&lon="+lon+"&key="+weatherId)
        wantLogLan = false
      }
      else{
        apiData = await axios.get("https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=7&city="+city+temp+"&key="+weatherId)
        console.log("want City")
      }
      loadingApi = false
      return  apiData     
    } catch (error) {
      console.log(error)
    }
  }

  function getUserLocation(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {

      loadingApi = true
      lon = pos.coords.longitude
      lan = pos.coords.latitude
      getWeatherData()
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success,error,options)
    wantLogLan = true
  }

   async function getWeatherData(){
      try {
        const data = await getApiData()
        if(loadingApi === false){
          setWeatherData(data.data)
          setCurrentCity(data.data.city_name)
          setCurrentCountry(data.data.country_code)
        }

      } catch (error) {
        console.log(error)
      }

  }


  useEffect(()=>{
    console.log("Mounted")
    return () => {
      console.log("cleaned up");
    };
  },[])


  function handleChange(e){
    e.preventDefault()
    loadingApi = true
    getWeatherData()
    console.group(e)
  }

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
            
            <Button variant="primary" type="submit" >Submit</Button>
            <Button variant="secondary"  onClick={getUserLocation}>
              <BsGeoAlt/>
            </Button>

            </Form.Row>
          </Form.Group>
          </Form>
          </span>
          </div>
          
    <div className = "displayWeather">
    

    {loadingApi ?<LoadingIndicator type="bubbles" color = "grey"/> :weatherData !== "" && <WeatherDisplay weatherData = {weatherData}/>}

    </div>

    </div>
  )
    }

// }
