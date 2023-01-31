import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ProtectedRoute from './utils/ProtectedRoute'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Messages from './pages/Messages'
import Inbox from './pages/Inbox'
import Sent from './pages/Sent'
import NewMessage from './pages/NewMessage'
import Message from './pages/Message'
import Home from './pages/Home'
import Settings from './pages/Settings'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/messages' element={<ProtectedRoute> <Messages /></ProtectedRoute>}>
              <Route path='inbox' element={<Inbox />} />
              <Route path='sent' element={<Sent />} />
              <Route path='new' element={<NewMessage />} />
              <Route path='message/:id' element={<Message />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
