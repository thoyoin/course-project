import Login from './components/Login';
import Registration from './components/Registration';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to='/Login' replace />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registration' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;