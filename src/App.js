import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Collection from './Pages/Collection/Collection';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
    </>
  );
}

export default App;
