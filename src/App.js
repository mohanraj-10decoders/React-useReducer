import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Add from './Add';
import Edit from './Edit';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add/:id' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
