import { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const[weather, setWeather] = useState(null)

    useEffect(() => {
        const WEATHER_API = import.meta.env.VITE_WEATHER_API
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${WEATHER_API}`)
          .then(response => {
            setWeather(response.data)
          })
    },[])

    if (weather === null) return <p>No Weather results found for the select capital</p>


    
    
    return(
        
        <div>
            <h2>{`Weather in ${country.capital[0]}`}</h2>
            <p>{`Tempeature ${(weather.main.temp - 273.5).toFixed(2)} Celcius`}</p>
            <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>{`Wind ${weather.wind.speed} m/s`}</p> 
        </div>
    )
}



export default Weather