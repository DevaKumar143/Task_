import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Edit from './components/Edit';
import Display from './components/Display';

function App() {
  return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
        <Route path="/create" element={<Create />} />
         <Route path="/show" element={<Display />} />
         <Route path="/edit/:id" element={<Edit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
        </BrowserRouter>

  );
}

export default App;
