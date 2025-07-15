import './loggedInfo.css'
import { NavBar } from './NavBar.jsx'

export const LoggedUser = ({ user, setUser }) => {
  return (
    <div className="loggedSection">
      <NavBar user={user} />
      <p>
        {user.name} is logged as a {user.username} <span>IN</span>
      </p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}
