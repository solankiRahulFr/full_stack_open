import { useState } from "react"
import CountryDetails from "./CountryDetails"

const SingleCountry = ({name})=>{
    const [show, setShow] = useState(false)
return (
            <div>
                <p>{name} <button onClick={() => setShow(!show)}>{show?"Hide":"Show"}</button></p>
                {show === true && <CountryDetails name={name} />}
            </div>
)
}

export default SingleCountry