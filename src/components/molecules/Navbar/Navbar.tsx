import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Icon from '../../../assets/addProjectIcon.svg';
import { useLogout } from '../../../hooks/useLogout';
import { useEffect } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function Navbar() {
  const { logout, error, isLoading } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Icon} alt="app logo" />
          <span>ProTaskinator</span>
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              {!isLoading && (
                <button className="btn" onClick={() => logout()}>
                  Logout
                </button>
              )}
              {isLoading && (
                <button className="btn" disabled>
                  ...
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
