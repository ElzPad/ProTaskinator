import './OnlineUsers.css';

import Avatar from '../../atoms/Avatar/Avatar';
import { useCollection } from '../../../hooks/useCollection';
import { UserType } from '../../../types/user';
import { useState } from 'react';
import ProfileIcon from '../../../assets/profileIcon.svg';
import { Link } from 'react-router-dom';

export default function OnlineUsers() {
  const { error, documents } = useCollection<UserType>('users', []);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleUsersList = () => {
    setIsVisible((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={`userList ${isVisible ? 'open' : ''}`}>
      <div className="toggleContainer" onClick={toggleUsersList}>
        <img className="toggleIcon" src={ProfileIcon} alt="Toggle sidebar" />
      </div>

      <div className="userListContent">
        <h2>All users</h2>

        {error && <div className="error">{error}</div>}
        {documents &&
          documents.map((user) => (
            <div key={user.id} className="userListItem">
              {user.online && <span className="onlineUser"></span>}
              <Link to={`/chat/${user.id}`}>
                <span>{user.displayName}</span>
              </Link>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
    </div>
  );
}
