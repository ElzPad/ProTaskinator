import { useState } from 'react';
import './Login.css';
import { useLogin } from '../../hooks/useLogin';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, error, isLoading } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
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

        {!isLoading && <button className="btn">Login</button>}
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
