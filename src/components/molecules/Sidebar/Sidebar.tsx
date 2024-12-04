import './Sidebar.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../../assets/dashboardIcon.svg';
import AddIcon from '../../../assets/addIcon.svg';

export default function Sidebar() {
  const { user } = useAuthContext();

  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <div className="user">
          <p>Hey {user ? user.displayName : 'user'}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
