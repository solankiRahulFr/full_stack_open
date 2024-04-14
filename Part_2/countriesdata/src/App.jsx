import { useState, useEffect } from 'react'
import axios from 'axios';
import FilterCountries from './components/FilterCountries.jsx'

const App = () => {
  const [allCountries, setAllCountries] = useState(null)
  const [filterCountry, setFilterCountry] = useState('')
  let filterCountries = [];

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setAllCountries(response.data.map(c=>c.name.common))
    })

  }, [])

  const handleCountryChange = (event) =>{
    setFilterCountry(event.target.value)
  }


  if(allCountries){
   filterCountries = allCountries.map(c => c.toLowerCase().includes(filterCountry.toLowerCase())) ?
    allCountries.filter(c => c.toLowerCase().includes(filterCountry.toLowerCase()))
      : allCountries
  }


  return (
    <div>
      find countries <input value={filterCountry} onChange={handleCountryChange} />
      <div>
        {filterCountry && <FilterCountries countries={filterCountries}/>}
      </div>
    </div>
  )
}

export default App