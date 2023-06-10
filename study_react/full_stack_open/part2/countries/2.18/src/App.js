import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountry = ({ filteredCountry }) => {
  const countryName = filteredCountry.name.common
  const capital = filteredCountry.capital
  const area = filteredCountry.area
  const languages = filteredCountry.languages
  const [imageSrc, setImageSrc] = useState('')

  const getImage = (url) => {
    axios.get(url)
      .then((response) => setImageSrc(response.config.url))
      .catch((error) => {
        console.error('Error fetching image:', error)
      })
  }

  getImage(filteredCountry.flags.png)

  return (
    <div>
      <h1>{countryName}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={key}>{languages[key]}</li>
        ))}
      </ul>
      <img src={imageSrc} />
    </div>
  )
}

const DisplayCountries = ({ countries, findCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if (findCountries !== '') {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(findCountries.toLowerCase())
      )
      if (filtered.length < 11) {
        setFilteredCountries(filtered)
      } else {
        setFilteredCountries([])
      }
    } else {
      setFilteredCountries([])
    }
  }, [findCountries])

  if (filteredCountries === null) {
    return null
  }

  if (filteredCountries.length === 1) {
    return <DisplayCountry filteredCountry={filteredCountries[0]} />
  }
  else if (filteredCountries.length < 11) {
    return (
      <div>
        {
          filteredCountries.map(filteredCountry => <div key={filteredCountry.name.common}>{filteredCountry.name.common}</div>)
        }
      </div>
    )
  }
}

const App = () => {
  const [findCountries, setFindCountries] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setFindCountries(event.target.value)
  }

  return (
    <div>
      <div>
        find countries
        <input value={findCountries} onChange={handleChange} />
      </div>
      <DisplayCountries countries={countries} findCountries={findCountries} />
    </div >
  )
}

export default App