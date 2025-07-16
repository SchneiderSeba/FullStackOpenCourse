import { Link } from 'react-router-dom'
import './NavBar.css' // Assuming you have a CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css'

export const NavBar = () => {
  return (
    <>
      <nav className="0" style={{ marginBottom: '0px' , paddingBottom: '0px', paddingTop: '0px' }}>
        <div className="A">
          <section className="B" >

            <div className="nav-item" >
              <Link className="nav-link active" aria-current="page" to='/'><button>Home 🏠</button></Link>
            </div>
            <div className="nav-item" >
              <Link className="nav-link" to='/users'><button>Users 👤</button></Link>
            </div>
            <div className="nav-item" >
              <Link className="nav-link" to='blogs'><button>Blogs 📙</button></Link>
            </div>
          </section>
        </div>
      </nav>

    </>
  )
}