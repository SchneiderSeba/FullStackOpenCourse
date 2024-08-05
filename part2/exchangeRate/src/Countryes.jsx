/* eslint-disable react/prop-types */

export function Countryes ({ countries, handleDetail}) {
    return(
        <div>
            {countries.map((country, i) => (

                <div key={i} className="country-detail">
                    <div>
                        <h3>{country.name.common}<img className="flag-img" src={country.flags.png}/></h3>
                    </div>
                        <button onClick={() => handleDetail(country)}>Show</button>
                </div>
            ))}
        </div>
        
    )
}
