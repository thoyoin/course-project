import React from 'react';
import CreateTemplate from './components/CreateTemplate';
import Login from './components/Login';
import PersonalPage from './components/PersonalPage';
import Registration from './components/Registration';
import FormPage from './components/FormPage';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import FilledFormPage from './components/FilledFormPage';
import HomePage from './components/HomePage';
import TemplateView from './components/TemplateView';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' replace />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/PersonalPage' element={<PersonalPage />} />
        <Route path='/TemplateView/:templateId' element={<TemplateView />} />
        <Route path='/CreateTemplate/:templateId' element={<CreateTemplate />} />
        <Route path='/FormPage/:templateId' element={<FormPage />} />
        <Route path='/FilledFormPage/:formId' element={<FilledFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
