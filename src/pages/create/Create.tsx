import './Create.css';
import React, { useState } from 'react';
import Select from 'react-select';

const requiredTimeChoices = [
  { value: '5 minutes', label: '5 minutes' },
  { value: '30 minutes', label: '30 minutes' },
  { value: '1 hour', label: '1 hour' },
  { value: '1 week', label: '1 week' },
];

export default function Create() {
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>('');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [requiredTime, setRequiredTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, notes, peopleList, tagsList, requiredTime, status);
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
        return [...prevList, '#' + newTag];
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
          <span>Notes:</span>
          <textarea
            required
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>
        <label>
          <span>People:</span>
          <input
            type="text"
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
          />
          <button
            type="button"
            className="btn"
            onClick={(e) => addNewPerson(e)}
          >
            Add
          </button>
          <ul>
            {peopleList.map((person) => {
              return (
                <span key={person}>
                  <span> {person}</span>
                  <span onClick={() => removePerson(person)}> (X),</span>
                </span>
              );
            })}
          </ul>
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <button type="button" className="btn" onClick={(e) => addNewTag(e)}>
            Add
          </button>
          <ul>
            {tagsList.map((tag) => {
              return (
                <span key={tag}>
                  <span> {tag}</span>
                  <span onClick={() => removeTag(tag)}> (X),</span>
                </span>
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
