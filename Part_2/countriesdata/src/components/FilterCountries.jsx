
import CountryDetails from "./CountryDetails";
import SingleCountry from "./SingleCountry";

const FilterCountries = ({ countries }) => {

    if (countries.length === 1) { return <CountryDetails name={countries[0]} /> }
    else if (countries.length > 10) { return <div>Too many matches, specify another filter</div> }
    else {

        return countries.map((selection) => {
            return <SingleCountry key={selection} name={selection}/>
        })
    }

}
export default FilterCountries;