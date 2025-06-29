import React from 'react';
import CreateTemplate from './components/CreateTemplate';
import Login from './components/Login';
import MainPage from './components/MainPage';
import Registration from './components/Registration';
import FormPage from './components/FormPage';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import FilledFormPage from './components/FilledFormPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' replace />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/MainPage' element={<MainPage />} />
        <Route path='/CreateTemplate/:templateId' element={<CreateTemplate />} />
        <Route path='/FormPage/:templateId' element={<FormPage />} />
        <Route path='/FormResponse/:formId' element={<FilledFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
