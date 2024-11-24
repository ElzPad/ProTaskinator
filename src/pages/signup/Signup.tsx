import { useState } from 'react';
import './Signup.css';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password, displayName);
    signup(email, password, displayName);
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
