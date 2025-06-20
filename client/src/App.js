import React from 'react';
import CreateTemplate from './components/CreateTemplate';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Registration from './components/Registration';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' replace />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/MainPage' element={<MainPage />} />
        <Route path='/CreateTemplate/:templateId' element={<CreateTemplate />} />
      </Routes>
    </div>
  );
}

export default App;
