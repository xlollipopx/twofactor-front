
import './App.css';
import React, {useState} from 'react'  
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VerificationForm from './components/VerificationForm'
import {Route, Link, Routes} from 'react-router-dom';
import { properties } from './properties.js';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



function App() {


  const [error, setError] = useState("");
  const [info, setInfo] = useState({email: "", username: "", description: ""});
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const Login = details => {
    const url = properties.serverUrl + '/login';
    Axios.post(url, {
      email: details.email,
      password: details.password
    })
        .then(res => {
          setError("");
          
          cookies.set('email', res.data.data.email);
          cookies.set('two_factor_token', res.data.data.two_factor_token);
          navigate('/verification');
        })
        .catch(function (error) {
         console.log(error.response.data._error.msg);
         setError(error.response.data._error.msg);
        })

  }

  const Verify = details => {
    const url = properties.serverUrl + '/2factor';
    Axios.post(url, {
      code: details.code,
      email: cookies.get('email'),
      two_factor_token: cookies.get('two_factor_token')
    })
        .then(res => {
          setError("");
          const accessToken = res.data.data.token;
          cookies.set('email', res.data.data.email);
          cookies.set('access_token', accessToken);
          getNotes();
        })
        .catch(function (error) {
         console.log(error.response.data._error.msg);
         setError(error.response.data._error.msg);
        })


    console.log(details);
  }

  const getNotes = () => {
    const url = properties.serverUrl + '/home';
    Axios.get(url, 

     {
      withCredentials: true,
      headers: {'Access-Control-Allow-Credentials': true, 'Content-Type': 'application/json'}
     })
        .then(res => {
          
          setInfo({...info, username: res.data.data.username, email: res.data.data.email, description: res.data.data.description});
          setNotes(res.data.data.notes);
          navigate('/home');
        });

  }


  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<LoginForm Login={Login} error={error}/>} />

      <Route exact path="/verification" element={<VerificationForm Verify={Verify} error={error}/>} />
      <Route exact path="/home" element={<Home info={info} notes={notes}/>} />

    
      </Routes>
     
      
    </div>
  );
}

export default App;
