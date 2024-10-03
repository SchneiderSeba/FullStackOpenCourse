
import './loggedInfo.css'

export const LoggedUser = ({ user, setUser }) => {
  return (
    <div className='loggedSection'>
      <p>{user.name} is logged <span>IN</span></p>
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  )
}