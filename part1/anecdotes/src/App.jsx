
import './App.css'
import { useState } from 'react'
import { RandomBtn } from './RandomBtn'
import { VoteBtn } from './VoteBtn'
import { VoteData } from './VoteData'
import { MostVote } from './MostVote'

function App() {
  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const totalVotes = votes[selected]

  console.log(totalVotes)

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{margin: '20px'}}>
        {anecdotes[selected]}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', width: '250px'}}>
        <RandomBtn setSelected={setSelected} anecdotesLength={anecdotes.length}/>
        <VoteBtn setVotes={setVotes} votes={votes} selected={selected}/>
      </div>

      <div style={{margin: '20px'}}>
        <VoteData totalVotes={totalVotes}/>
      </div>

      <div>
        <MostVote votes={votes} anecdotes={anecdotes}/>
      </div>
    </div>
    
  )
}

export default App
