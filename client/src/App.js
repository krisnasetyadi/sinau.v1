import React,{useEffect, useState} from 'react';
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import Register from './component/Register';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  function setAuth(boolean){
    setIsAuthenticated(boolean)
  }
  async function isAuth(){
    try{
      const response = await fetch('http://localhost:5000/auth/is-verify',{
        method:"GET",
        headers:{token: localStorage.token}
      })
      const parseRes = await response.json()
      // console.log(parseRes)
      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false)
    }catch(err){
      console.error(err.message)
    }
  }
  useEffect(()=>{
    isAuth()
  })
  return (
    <div className="App">
     <Routes>
       <Route exact path='/login' 
       element={!isAuthenticated ?  (<Login setAuth={setAuth}/>) 
       : (<Navigate to='/dashboard'/>)}/>

       <Route exact path='/register' 
       element={!isAuthenticated ? (<Register setAuth={setAuth}/>) 
       : (<Navigate to='/login'/>)}/>
       
       <Route exact path='/dashboard' 
       element={ isAuthenticated ? (<Dashboard setAuth={setAuth}/>) 
       :  (<Navigate to='/login'/>)} />


     </Routes>
    </div>
  );
}

export default App;
