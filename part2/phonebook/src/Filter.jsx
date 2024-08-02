/* eslint-disable react/prop-types */


export function Filter ({ handleSearch }) {
    return(
        <>
            Search: <input onChange={handleSearch}/>
        </>
        
    )
}