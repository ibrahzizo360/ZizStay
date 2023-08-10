import  './navbar.css'
import {Link} from 'react-router-dom'
const NavBar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to={'/'} style={{color:'inherit', textDecoration:'none'}}>
        <span className="logo">Ziz Stay</span>
        </Link>
        {user? user.username : <div className="navItems">
            <button className="navButton">Register</button>
            <Link to={'/login'} style={{color:'inherit', textDecoration:'none'}}>
            <button className="navButton">Login</button>
            </Link>
        </div>}
        </div>
        </div>
    
  )
}

export default NavBar