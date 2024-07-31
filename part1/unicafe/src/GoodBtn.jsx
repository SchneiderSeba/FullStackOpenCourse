/* eslint-disable react/prop-types */

export function GoodBtn ({ total, setTotal, good, setGood }) {


    const handleClick = () => {
        setGood(good + 1)
        setTotal(total + 1)
    }

    console.log(`Good ${good}`)

    return(
        <button onClick={handleClick}>Good</button>
        
    )
    
}