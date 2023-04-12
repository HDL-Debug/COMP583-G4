import logo from './logo.svg';
import './App.css';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/profilepage' element={<AuthDetails/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

      </Routes>
      
    </div>
  );
}

export default App;