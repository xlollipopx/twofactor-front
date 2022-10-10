import React from 'react'
import  {useState} from 'react'  
import {Link} from 'react-router-dom'

function SignupForm({Signup, signupError}) {

    const [details, setDetails] = useState({username: "",email:"", password:""});

    const submitHandler = e => {
        e.preventDefault();
        Signup(details);
    }

    return (
        <div className="App">
       <form onSubmit={submitHandler} className='xform'>
        <div className="form-inner">
            <h2>Sign up</h2>
            
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value })} value={details.username} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value })} value={details.email} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value })} value={details.password}/>
            </div>
            <div className="link">
            <Link to="/">Sign in</Link>
            </div>
            {(signupError != "") ? (<div className="error"> {signupError}</div>) : ""}
            <input type="submit" value="Sign up"/>
        </div>
       </form>
       </div>
    )
}

export default SignupForm;