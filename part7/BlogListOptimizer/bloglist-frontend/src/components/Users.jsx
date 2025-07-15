import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/user.js'
import { UniqueUser } from './uniqueUser.jsx'

export const Users = ({ showUsers, handleShowUsers, blogs }) => {
  const [allUsers, setAllUsers] = useState([])
  const [viewDetailsId, setViewDetailsId] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers()
        setAllUsers(users)
        console.log('Users fetched:', users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [blogs])


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button style={{ marginBottom: '20px', backgroundColor: 'transparent', border: 'solid 1px green' }} onClick={() => handleShowUsers()}>
          {showUsers ? 'Hide ➖' : 'Users Info ➕'}
        </button>
      </div>
      <section style={{ display: showUsers ? 'block' : 'none', marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '70px' }}>Users</h2>
        <ul>
          {allUsers.map(user => (
            <li key={user._id}>
              <strong>{user.username}</strong><span> , Blogs : {user.blogs.length}</span>
              <div>
                <UniqueUser user={user} viewDetailsId={viewDetailsId} setViewDetailsId={setViewDetailsId} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )

}
