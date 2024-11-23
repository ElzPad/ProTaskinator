import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Icon from '../../../assets/icon.svg'

export default function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <img src={Icon} alt="app logo" />
          <span>ProTaskinator</span>
        </li>
        
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/signup">Signup</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </div>
  )
}
