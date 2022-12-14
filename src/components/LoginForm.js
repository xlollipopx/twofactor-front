import React from 'react'
import  {useState} from 'react'  
import {Link} from 'react-router-dom'

function LoginForm({Login, error}) {

    const [details, setDetails] = useState({email:"", password:""});

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }

    return (
        <div className="App">
       <form onSubmit={submitHandler} className='xform'>
        <div className="form-inner">
            <h2>Login</h2>
            
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value })} value={details.email} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value })} value={details.password}/>
            </div>
            <div className="link">
            <Link to="/signup">Sign up</Link>
            </div>
            {(error != "") ? (<div className="error"> {error}</div>) : ""}
            <input type="submit" value="Login"/>
        </div>
       </form>
       </div>
    )
}

export default LoginForm;