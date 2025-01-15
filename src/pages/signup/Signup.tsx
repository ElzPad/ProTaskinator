import React, { useState } from 'react';
import './Signup.css';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (thumbnail) {
      signup(email, password, displayName, thumbnail);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThumbnail(null);
    let selected = e.target.files?.[0];

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <>
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile thumbnail:</span>
          <input type="file" required onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>

        {!isLoading && <button className="btn">Submit</button>}
        {isLoading && (
          <button disabled className="btn">
            Loading
          </button>
        )}

        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}
