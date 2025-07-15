import { Link } from 'react-router-dom'
import './NavBar.css' // Assuming you have a CSS file for styling

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginBottom: '0px' , paddingBottom: '0px', paddingTop: '0px' }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <section className="navbar-nav" style={{ display: 'flex', justifyContent: 'space-around' }} >

              <div className="nav-item" style={{ marginRight: '20px' }}>
                <Link className="nav-link active" aria-current="page" to='/'><button>Home 🏠</button></Link>
              </div>
              <div className="nav-item" style={{ marginRight: '20px' }}>
                <Link className="nav-link" to='/users'><button>Users 👤</button></Link>
              </div>
              <div className="nav-item" style={{ marginRight: '20px' }}>
                <Link className="nav-link" to='blogs'><button>Blogs 📙</button></Link>
              </div>
            </section>
          </div>
        </div>
      </nav>

    </>
  )
}