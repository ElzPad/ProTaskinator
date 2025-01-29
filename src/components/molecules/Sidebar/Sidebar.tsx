import './Sidebar.css';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../../assets/dashboardIcon.svg';
import RightArrowIcon from '../../../assets/rightArrowIcon.svg';
import AddProjectIcon from '../../../assets/addProjectIcon.svg';
import AddTaskIcon from '../../../assets/addTaskIcon.svg';
import { useState } from 'react';

export default function Sidebar() {
  const { user } = useAuthContext();
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsVisible((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={`sidebar ${isVisible ? 'open' : ''}`}>
      {isVisible && (
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
                <NavLink to="/create-project">
                  <img src={AddProjectIcon} alt="add project icon" />
                  <span>New Project</span>
                </NavLink>
                <NavLink to="/create-task">
                  <img src={AddTaskIcon} alt="add task icon" />
                  <span>New Personal Task</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <div className="toggleContainer" onClick={toggleSidebar}>
        <img className="toggleIcon" src={RightArrowIcon} alt="Toggle sidebar" />
      </div>
    </div>
  );
}
