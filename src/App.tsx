import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Navbar from './components/molecules/Navbar/Navbar'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Task from './pages/task/Task'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task/:id" element={<Task />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
