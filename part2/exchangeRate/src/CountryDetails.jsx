/* eslint-disable react/prop-types */

export function CountryDetails({country, handleDetail, weather }) {
    return (
            <div className="country-box">
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}km</p>
                <p>Flag: <img className="flag-img" src={country.flags.png}/></p>
                <div>
                Languages: {Object.entries(country.languages).map(([code, language], i) => (
                        <span key={i}>
                            <p>{language} - {code}</p>
                        </span>
                    ))}
                </div>

               <h3>Weather in {country.capital}</h3>

                {weather && weather.main ? (
                <div>
                    <p>Temperature {weather.main.temp}</p>
                    <p>Humidity {weather.main.humidity}</p>
                </div>) : (<p>Loading weather data...</p>)}
                

                <button onClick={handleDetail}>Hide</button>
            </div>
    )

}
