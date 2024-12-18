import './Create.css';
import React, { useState } from 'react';
import Select from 'react-select';
import { useFirestore } from '../../hooks/useFirestore';
import { TaskType } from '../../types/task';
import { useNavigate } from 'react-router-dom';
import { timestamp } from '../../firebase/config';
import ChipsBar from '../../components/atoms/ChipsBar/ChipsBar';

const requiredTimeChoices = [
  { value: '5 minutes', label: '5 minutes' },
  { value: '30 minutes', label: '30 minutes' },
  { value: '1 hour', label: '1 hour' },
  { value: '1 week', label: '1 week' },
];

export default function Create() {
  const [title, setTitle] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>('');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [requiredTime, setRequiredTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { addDocument, response } = useFirestore('tasks');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: TaskType = {
      title,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      notes,
      peopleList,
      tagsList,
      status,
      requiredTime,
    };
    addDocument<TaskType>(task);
    if (!response.error) {
      navigate('/');
    }
  };

  const addNewPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPerson.length > 0 && !peopleList.includes(newPerson)) {
      setPeopleList((prevList) => {
        return [...prevList, newPerson];
      });
    }
    setNewPerson('');
  };
  const removePerson = (person: string) => {
    setPeopleList((prevList) => {
      return prevList.filter((elem) => elem != person);
    });
  };

  const addNewTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.length > 0 && !tagsList.includes(newTag)) {
      setTagsList((prevList) => {
        return [...prevList, newTag];
      });
    }
    setNewTag('');
  };
  const removeTag = (tag: string) => {
    setTagsList((prevList) => {
      return prevList.filter((elem) => elem != tag);
    });
  };

  return (
    <div>
      <h2 className="pageTitle">Create new task</h2>
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
          <span>Due date:</span>
          <input
            required
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Notes:</span>
          <textarea
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <label>
          <span>People:</span>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addNewPerson(e);
                }
              }}
            />
            <button
              type="button"
              className="btn"
              onClick={(e) => addNewPerson(e)}
            >
              Add
            </button>
          </div>
          <ul>
            {peopleList.map((person) => {
              return (
                <ChipsBar
                  key={person}
                  content={person}
                  handleRemove={() => removePerson(person)}
                />
              );
            })}
          </ul>
        </label>
        <label>
          <span>Tags:</span>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addNewTag(e);
                }
              }}
            />
            <button type="button" className="btn" onClick={(e) => addNewTag(e)}>
              Add
            </button>
          </div>
          <ul>
            {tagsList.map((tag) => {
              return (
                <ChipsBar
                  key={tag}
                  content={`#${tag}`}
                  handleRemove={() => removeTag(tag)}
                />
              );
            })}
          </ul>
        </label>
        <label>
          <span>Required time:</span>
          <Select
            onChange={(option) => setRequiredTime(option ? option.value : '')}
            options={requiredTimeChoices}
          />
        </label>
        <label>
          <span>Status:</span>
          <input
            required
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
