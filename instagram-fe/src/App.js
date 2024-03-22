import Login from './Pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup';
import Navbar from './components/Navbar'
import PostOverview from './Pages/PostOverview';
import Profile from './Pages/Profile'
import  { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  
  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer);

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) { 
      dispatch({ type : "LOGIN_SUCCESS", payload: userData })
      navigate("/posts");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGIN_ERROR" });
      navigate("/login");
    }
  }, []);

  return(
    <Routes>
      <Route exact path="*" element={<Login />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/posts" element={<PostOverview />}></Route>
      <Route exact path="/myprofile" element={<Profile />}></Route>
    </Routes>
  )
  }
  
  return (
    <div>
      <Router>
        <Navbar />
        <DynamicRouting />
      </Router>
    </div>
    
  );
}

export default App;
