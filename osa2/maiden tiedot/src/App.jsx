import { useState, useEffect } from 'react'
import countryList from './services/countries'

const CountryFinds = ({ countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length > 1) {
        return (
            <ul>
                {countries.map(country => (
                    <li key={country.cca3}>{country.name.common}</li>
                ))}
            </ul>
        )
    }
    if (countries.length === 1) {
        const country = countries[0]
        return (
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
                <img src={country.flags.svg} alt="Flag of {country.name.common}" width={200}/>
            </div>
        )
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [countries, setCountries] = useState([])
    const [searched, setSearched] = useState(false)
    const [allCountries, setAllCountries] = useState([])

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

    return (
        <form>
        <div>
            <p>find countries <input value={searchTerm} onChange={handleSearchChange}/></p>
            {searched && <CountryFinds countries={countries} />}
        </div>
        </form>
    )
}

export default App

