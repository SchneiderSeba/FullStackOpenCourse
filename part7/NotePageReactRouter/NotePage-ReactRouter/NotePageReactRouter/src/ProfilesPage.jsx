import { Link } from 'react-router-dom'

export const ProfilesPage = () => {

    const profiles = [1, 2, 3, 4, 5]

  return (
    <>
      <h1>Profiles Page</h1>

      <Link to="/profile">Profile</Link>
      <br />
      <Link to="/profiles">Profiles</Link>
      <div>
        {profiles.map((profile) => (
          <div key={profile}>
            <h2>Profile {profile}</h2>
            <p>Profile {profile} description</p>
            <Link to={`/profile/${profile}`}>View Profile {profile}</Link>
          </div>
        ))}
      </div>
    </>
  )
}