/* eslint-disable react/prop-types */

export function BadBtn ({ total, setTotal, bad, setBad }) {

    

    const handleClick = () => {


        setBad(bad + 1)
        setTotal(total + 1)
    }

    console.log(`Bad ${bad}`)

    return(
        <button onClick={handleClick}>Bad</button>
    )
}