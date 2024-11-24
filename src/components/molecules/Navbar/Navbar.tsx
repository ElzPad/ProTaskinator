import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Icon from '../../../assets/logoIcon.svg';
import { useLogout } from '../../../hooks/useLogout';
import { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function Navbar() {
  const { logout, error, isLoading } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Icon} alt="app logo" />
          <span>ProTaskinator</span>
        </li>

        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>

        {!isLoading && (
          <li>
            <button className="btn" onClick={() => logout()}>
              Logout
            </button>
          </li>
        )}
        {isLoading && (
          <li>
            <button className="btn" disabled>
              ...
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
