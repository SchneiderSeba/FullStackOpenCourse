
import './App.css'
import { Countryes } from './Countryes'
import { useState, useEffect } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { TooMany } from './TooMany'
import { CountryDetails } from './CountryDetails'

const App = () => {

  const [value, setValue] = useState('')
  const [country, setCountry] = useState([])
  const [searchedCountry, setSearchedCountry] = useState([])
  const [showDetail, setShowDetail] = useState(false)
  const [selected, setSelected] = useState(null)
  const [weather, setWeather] = useState([])

  useEffect(() => {
      
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountry(response.data)
        })
        
    }
  , [])

  console.log(country)

  const API_KEY = import.meta.env.VITE_SOME_KEY
  const countryCuery = selected ? selected.capital[0] : ''

  useEffect(() => {

    axios
      .get(`https://samples.openweathermap.org/data/2.5/weather?q=${countryCuery}&appid=${API_KEY}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  console.log(countryCuery)
  console.log(weather)

  const debouncedSearch = debounce((inputValue) => {
    if (country && country.length > 0) {
      setSearchedCountry(country.filter(country => country.name.common.toLowerCase().includes(inputValue.toLowerCase())))
  }}, 10)

  const handleChange = (event) => {
    const inputValue = event.target.value
    setValue(inputValue)
    debouncedSearch(inputValue)
  }

  const handleDetail = (country) => {
    setShowDetail(true)
    setSelected(country)
  }
  console.log(showDetail)

  return (
    <div>
      <form>
        <h2>Search Country:</h2><input value={value} onChange={handleChange} />
      </form>
        {searchedCountry.length > 0 && searchedCountry.length <= 10 ? <Countryes countries={searchedCountry} handleDetail={handleDetail} /> : null}
        {showDetail && selected ? <CountryDetails handleDetail={() => setShowDetail(false)} country={selected} weather={weather}/> : null}
        {searchedCountry.length > 10 && value !== '' ? <TooMany /> : null}
        {searchedCountry.length === 0 && value == '' && <p>No countries found</p>}
    </div>
  )
}

export default App
