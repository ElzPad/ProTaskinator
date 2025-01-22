import './OnlineUsers.css';

import Avatar from '../../atoms/Avatar/Avatar';
import { useCollection } from '../../../hooks/useCollection';
import { UserType } from '../../../types/user';
import { useState } from 'react';
import ProfileIcon from '../../../assets/profileIcon.svg';
import ChatIcon from '../../../assets/chatIcon.svg';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function OnlineUsers() {
  const { error, documents } = useCollection<UserType>('users', []);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { user: loggedUser } = useAuthContext();

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

        {loggedUser && (
          <div className="userListItem">
            <span className="onlineUser"></span>
            <span>{`${loggedUser.displayName} (me)`}</span>
            <Avatar src={loggedUser.photoURL ? loggedUser.photoURL : ''} />
            <span className="noIcon"></span>
          </div>
        )}
        {documents &&
          documents
            .filter((user) => user.id != loggedUser?.uid)
            .map((user) => (
              <div key={user.id} className="userListItem">
                {user.online && <span className="onlineUser"></span>}
                <span>{user.displayName}</span>
                <Avatar src={user.photoURL} />
                <Link to={`/chat/${user.id}`}>
                  <img src={ChatIcon} alt="Open chat" />
                </Link>
              </div>
            ))}
      </div>
    </div>
  );
}
