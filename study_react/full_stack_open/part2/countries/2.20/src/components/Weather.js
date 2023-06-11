import { useState } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
// variable api_key has now the value set in startup

const getImage = (url, setSrc) => {
    axios.get(url)
        .then((response) => setSrc(response.config.url))
        .catch((error) => {
            console.error('Error fetching image:', error)
        })
}

const setWeather = (city, setTemp, setWind, setIcon) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`).then(response => {
        const icon = response.data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

        setTemp(response.data.main.temp)
        setWind(response.data.wind.speed)
        getImage(iconUrl, setIcon)
    })
}

const Weather = ({ filteredCountry }) => {
    const capital = filteredCountry.capital
    const [temp, setTemp] = useState(0)
    const [wind, setWind] = useState(0)
    const [icon, setIcon] = useState('')

    setWeather(capital, setTemp, setWind, setIcon)

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>temperature {temp} Celcius</div>
            <img src={icon} />
            <div>wind {wind} m/s</div>
        </div>
    )
}

export default Weather