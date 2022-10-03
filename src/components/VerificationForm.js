import React from 'react'
import  {useState} from 'react'  

function VerificationForm({Verify, error}) {

    const [details, setDetails] = useState({code:"", email:"", twoFactorToken: ""});

    const submitHandler = e => {
        e.preventDefault();
        Verify(details);
    }

    return (
       <form onSubmit={submitHandler}>
        <div className="form-inner">
            
            <div className="form-group">
                <label htmlFor="code">Verification code:</label>
                <input type="text" name="code" id="code" onChange={e => setDetails({...details, code: e.target.value })} value={details.code} />
            </div>

            {(error != "") ? (<div className="error"> {error}</div>) : ""}
            <input type="submit" value="Continue"/>
        </div>
       </form>
    )
}

export default VerificationForm;