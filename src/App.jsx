import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Employee from './pages/Employee';
import PrivateRoute from './PrivateRoute';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';

function App() {
  return (
   <Router>
   <Routes>
   <Route exact path="" element={<Login />} />
   <Route exact path="/register" element={<SignUp />} />   
   <Route element={<PrivateRoute/>}>
          <Route path="/employee" element={<Employee/>} />
  </Route> 
  <Route exact path="*" element={<NotFound/>} />  
   </Routes>
   </Router>
  );
}

export default App;
