import React from 'react'
import  {useState} from 'react'  

function VerificationSignupForm({VerifySignup, error}) {

    const [details, setDetails] = useState({code:""});

    const submitHandler = e => {
        e.preventDefault();
        VerifySignup(details);
    }

    return (
        <div className="App">
       <form onSubmit={submitHandler} className='xform'>
        <div className="form-inner">
            
            <div className="form-group">
                <label htmlFor="code">Verification code:</label>
                <input type="text" name="code" id="code" onChange={e => setDetails({...details, code: e.target.value })} value={details.code} />
            </div>

            {(error != "") ? (<div className="error"> {error}</div>) : ""}
            <input type="submit" value="Continue"/>
        </div>
       </form>
       </div>
    )
}

export default VerificationSignupForm;