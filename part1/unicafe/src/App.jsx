
import { useState } from 'react'
import { GoodBtn } from './GoodBtn'
import './App.css'
import { NeutralBtn } from './NeutralBtn'
import { BadBtn } from './BadBtn'
import { Statistics } from './Statistics'

function App() {
  
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  console.log(`Total ${total}`)
  

  return (
    <>
      <div className='container'>
      <h1>Give Feedback</h1>
      <GoodBtn total={total} setTotal={setTotal} good={good} setGood={setGood}/>
      <NeutralBtn total={total} setTotal={setTotal} neutral={neutral} setNeutral={setNeutral}/>
      <BadBtn total={total} setTotal={setTotal} bad={bad} setBad={setBad}/>
    </div>
    <div>
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
    </div>
    </>
    
    
    
  )
}

export default App
