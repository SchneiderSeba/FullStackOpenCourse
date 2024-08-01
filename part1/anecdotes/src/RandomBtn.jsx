/* eslint-disable react/prop-types */


export function RandomBtn ({ setSelected, anecdotesLength }) {

    // console.log(getRandomInt(7))

    const handleRandom = () => {
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        
        const randomIndex = getRandomInt(anecdotesLength)

        setSelected(randomIndex)
     

    

    }

    return(
        <button onClick={handleRandom}>Next Anecdote</button>
    )
}