import './App.css'
import { Link } from 'react-router-dom'

function App() {
  
  return (
    <>
      <h1>React Router 🌐</h1>

      <Link to="/profile" style={{ color: 'orange'}}>Profile</Link>
      <br />
      <Link to="/profiles" style={{ color: 'red'}}>Profiles</Link>
    </>
  )
}

export default App
