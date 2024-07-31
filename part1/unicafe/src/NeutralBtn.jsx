/* eslint-disable react/prop-types */

export function NeutralBtn ({ total, setTotal, neutral, setNeutral }) {

    

    const handleClick = () => {
        setNeutral(neutral + 1)
        setTotal(total + 1)
    }
    console.log(`Neutral ${neutral}`)

    return(
        <button onClick={handleClick}>Neutral</button>
    )
}