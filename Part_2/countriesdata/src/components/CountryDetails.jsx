import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountryDetails = ({ name }) => {
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        setCountryDetails(response.data);
      });
  }, []);

  if (!countryDetails) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h1>Name : {countryDetails.name.common}</h1>
      <h4>Official Name : {countryDetails.name.official}</h4>
      <div>
        <p>Capital : {countryDetails.capital[0]}</p>
        <p>Area : {countryDetails.area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.values(countryDetails.languages).map((val) => (
            <li key={val}>{val}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Flag</h3>
        <img src={countryDetails.flags.png} alt={countryDetails.flags.alt} />
      </div>

      <div>
        <Weather country={countryDetails}/>
      </div>
    </>
  );
};

export default CountryDetails;
