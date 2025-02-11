import { useState, useEffect } from 'react'
import countryList from './services/countries'


const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        const fetchWeather = async () => {
            const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
            const city = country.capital
            if (city) {
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
                    const data = await response.json()
                    if (data.cod === 200) {
                        setWeather(data)
                    } else {
                        setWeather(null)
                    }
                } catch (error) {
                    setWeather(null)
                }
            }
        }
        fetchWeather()
    }, [country])

    return(
    <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.values(country.languages).map(lang => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width={200}/>
        {weather && (
            <>
                <h3>Weather in {country.capital}:</h3>
                <p>temperature: {weather.main.temp}°C</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    width={50}
                />
                <p>wind: {weather.wind.speed} m/s</p>
            </>
        )}
    </div>
    )
}

const CountryFinds = ({countries, onShowCountry}) => {
    if (countries.length > 10) {
        return(
            <p>Too many matches, specify another filter</p>)
    }
    if (countries.length > 1) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.cca3}>{country.name.common}
                        <button onClick={() => onShowCountry(country)}>show</button></li>
                ))}
            </ul>
        )
    }
    if (countries.length === 1) {
        return null
    }
    if (countries.length === 0) {
        return(
        <p>No matches found</p>)
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [countries, setCountries] = useState([])
    const [searched, setSearched] = useState(false)
    const [allCountries, setAllCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(()=>{
        countryList
            .getAll()
            .then(countryData =>{
                setCountries(countryData)
        setAllCountries(countryData)}
            )
    }, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        setSearched(true)
        if (event.target.value) {
            const filtered = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value))
            setCountries(filtered)}
         else {
            setCountries(allCountries)
        }
    }

    const handleShowCountry = (country) => {
        setSelectedCountry(country)
        setCountries([country])
    }

    return (
        <form>
        <div>
            <p>find countries <input value={searchTerm} onChange={handleSearchChange}/></p>
            {searched &&
                <CountryFinds countries={countries} onShowCountry={handleShowCountry} />}
            {selectedCountry && (
                <CountryInfo country={selectedCountry} />
            )}
            {countries.length === 1 && !selectedCountry && (
                <CountryInfo country={countries[0]} />
            )}
        </div>
        </form>
    )
}

export default App