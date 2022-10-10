
import './App.css';
import React, {useState} from 'react'  
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import VerificationForm from './components/VerificationForm'
import VerificationSignupForm from './components/VerificationSignupForm'

import {Route, Link, Routes} from 'react-router-dom';
import { properties } from './properties.js';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import TodoForm from './components/TodoForm';



function App() {


  const [error, setError] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const Login = details => {
    const url = '/login';
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

  const Signup = details => {
    const url = '/signup';
    Axios.post(url, {
      username: details.username,
      email: details.email,
      password: details.password
    })
        .then(res => {
          setSignupError("");
          setError("");
          
          cookies.set('email', res.data.data.email);
          cookies.set('access_token', res.data.data.token);
          navigate('/verification-signup');
        })
        .catch(function (error) {
         console.log(error.response.data._error.msg);
         setSignupError(error.response.data._error.msg);
        })

  }

  const Verify = details => {
    const url = '/2factor';
    Axios.post(url, {
      code: details.code,
      email: cookies.get('email'),
      two_factor_token: cookies.get('two_factor_token')
    })
        .then(res => {
          setError("");
          setSignupError("");
          const accessToken = res.data.data.token;
          cookies.set('email', res.data.data.email);
          cookies.set('access_token', accessToken);
          navigate('/home');
        })
        .catch(function (error) {
         console.log(error.response.data._error.msg);
         setError(error.response.data._error.msg);
        })
  }

  const VerifySignup = details => {
    const url = '/verification';
    Axios.post(url,
      {
        code: details.code
      },
       {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    }
    })
        .then(res => {
          setError("");
          setSignupError("");
          navigate('/home');
        })
        .catch(function (error) {
         console.log(error.response.data._error.msg);
         setError(error.response.data._error.msg);
        })
  }

  return (
    <div>
      <Routes>
      <Route exact path="/" element={<LoginForm Login={Login} error={error}/>} />
      <Route exact path="/signup" element={<SignupForm Signup={Signup} signupError={signupError}/>} />
      <Route exact path="/verification" element={<VerificationForm Verify={Verify} error={error}/>} />
      <Route exact path="/home" element={<Home/>} />
      <Route exact path="/verification-signup" element={<VerificationSignupForm VerifySignup={VerifySignup} error={error}/>} />
      </Routes>  
    </div>
  );
}

export default App;
