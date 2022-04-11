import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ProtectedRoute from '../config/ProtectedRoute';
import Landing from './Landing';
import Login from './Auth/Login';
import Home from './Users/Home';
import Dashboard from './Admin/Dashboard';
import Register from './Auth/Register';
import Members from './Users/Team';
import Navbar from './Navbar/Navbar';
import Events from './Users/Events';
import SingleEvent from './Users/SingleEvent';
import RegisterEvent from './Users/RegisterEvent';
import About from './Users/About';

function App() {

  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <div className="App">
      <Navbar isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<Events />} />
        <Route path='/about' element={ <About /> } />


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path='/team' element={<Members />} />
          <Route path='/events/:eventId' element={<SingleEvent />} />
          <Route path='/registerEvent' element={<RegisterEvent />} />
        </Route>

      <Route path='*' element={<div>Not Found</div>} />

      </Routes>
    </div>
  );
}

export default App;
