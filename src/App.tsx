import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/molecules/Navbar/Navbar';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Task from './pages/task/Task';
import Chat from './pages/chat/Chat';
import Tag from './pages/tag/Tag';
import Create from './pages/create/Create';
import { useAuthContext } from './hooks/useAuthContext';
import Sidebar from './components/molecules/Sidebar/Sidebar';
import OnlineUsers from './components/molecules/OnlineUsers/OnlineUsers';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/login" />}
              />
              <Route
                path="/task/:id"
                element={user ? <Task /> : <Navigate to="/login" />}
              />
              <Route
                path="/tag/:id"
                element={user ? <Tag /> : <Navigate to="/login" />}
              />
              <Route
                path="/chat/:id"
                element={user ? <Chat /> : <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
