import './Create.css';
import React, { useState } from 'react';

export default function Create() {
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [peopleList, setPeopleList] = useState<string[]>([]);
  const [newPerson, setNewPerson] = useState<string>('');
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, notes, peopleList, tagsList, status);
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
