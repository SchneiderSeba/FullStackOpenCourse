import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/user.js'

export const Users = ({ showUsers, handleShowUsers, blogs }) => {
  const [allUsers, setAllUsers] = useState([])
  const [viewDetails, setViewDetails] = useState(false)

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
        <button style={{ marginBottom: '20px', backgroundColor: 'green' }} onClick={() => handleShowUsers()}>
          {showUsers ? 'Hide ➖' : 'Users Info ➕'}
        </button>
      </div>
      <section style={{ display: showUsers ? 'block' : 'none', marginBottom: '20px' }}>
        <h2 >Users</h2>
        <ul>
          {allUsers.map(user => (
            <li key={user._id}>
              <>
                <strong>{user.username}</strong><span> , Blogs : {user.blogs.length}</span>
                <button onClick={() => setViewDetails(!viewDetails)} style={{ marginLeft: '10px', backgroundColor: 'grey', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                  {viewDetails ? 'Hide Details' : 'View Details'}
                </button>
                {viewDetails && (
                  <div>
                    <p>Blogs:</p>
                    <ul>
                      {user.blogs.map(blog => (
                        <li key={blog._id}>{blog.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            </li>
          ))}
        </ul>
      </section>
    </>
  )

}
