import './CreateProject.css';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ProjectType } from '../../types/project';
import { useCollection } from '../../hooks/useCollection';
import { UserType } from '../../types/user';
import { MessageType } from '../../types/message';

export default function CreateProject() {
  const [title, setTitle] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [briefDescription, setBriefDescription] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [assignedUsersInfo, setAssignedUsersInfo] = useState<
    Record<string, string[]>
  >({});

  const { addDocument: addProject, response: projectResponse } =
    useFirestore('projects');
  const { addDocument: addMessage } = useFirestore('messages');
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { error, documents: registeredUsers } = useCollection<UserType>(
    'users',
    []
  );
  const [registeredUsersOptions, setRegisteredUsersOptions] = useState<any[]>();
  const [usersReady, setUsersReady] = useState<boolean>(false);

  useEffect(() => {
    if (!error && registeredUsers) {
      setRegisteredUsersOptions(
        registeredUsers.map((user) => {
          return { label: user.displayName, value: user };
        })
      );
      setUsersReady(true);
    }
  }, [registeredUsers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.log('User not loaded');
    } else {
      assignedUsersInfo[user.uid] = [
        user.displayName ? user.displayName : '',
        user.photoURL ? user.photoURL : '',
      ];

      const project: ProjectType = {
        createdBy: {
          name: user.displayName ? user.displayName : 'User',
          uid: user.uid,
        },
        createtAt: timestamp.fromDate(new Date()),
        title,
        briefDescription,
        description,
        startDate: timestamp.fromDate(new Date(startDate)),
        dueDate: timestamp.fromDate(new Date(dueDate)),
        assignedUsers: [user.uid, ...assignedUsers],
        assignedUsersInfo,
        progress: {
          toDo: 0,
          inProgress: 0,
          completed: 0,
        },
      };
      addProject<ProjectType>(project);

      assignedUsers.forEach((assignedUser) => {
        const message: MessageType = {
          senderUid: user.uid,
          receiverUid: assignedUser,
          content: `${user.displayName} added you to project ${project.title}.`,
          type: 2,
          createdAt: timestamp.fromDate(new Date()),
          senderName: user.displayName ? user.displayName : 'User',
          isGroupChat: false,
        };
        addMessage<MessageType>(message);
      });

      console.log(projectResponse);
      if (!projectResponse.error) {
        navigate(`/project/44`);
      }
    }
  };

  return (
    <div>
      <h2 className="pageTitle">Create new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Start date:</span>
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          <span>Due date:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Brief description:</span>
          <input
            type="text"
            required
            value={briefDescription}
            onChange={(e) => setBriefDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Longer description:</span>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          <span>Assigned Users:</span>
          <Select
            onChange={(options) => {
              const info: Record<string, string[]> = {};
              options.forEach((entry) => {
                info[entry.value.id] = [
                  entry.value.displayName,
                  entry.value.photoURL,
                ];
              });
              setAssignedUsers(options.map((entry) => entry.value.id));
              setAssignedUsersInfo(info);
            }}
            options={registeredUsersOptions}
            isDisabled={!usersReady}
            menuPlacement="top"
            isMulti
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
