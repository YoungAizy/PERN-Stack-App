import React, {useState} from 'react'

function NewUserForm() {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState()

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <div className="form-margin form-floating">
                <input type="text" name="full_name" id="fullName" className="form-control" placeholder='John Doe' onChange={e => setFullName(e.target.value)}/>
                <label htmlFor="fullName">Full Name</label>
            </div>
            <div className="form-floating form-margin">
                <input id="newUserEmail" type="email" className="form-control" placeholder="example@host.com" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="newUserEmail">E-Mail</label>
            </div>
            <div className="form-floating form-margin">
                <input id="passwrd" type="password" className="form-control" placeholder='abc' onChange={e => setPassword(e.target.value)} />
                <label htmlFor="passwrd">Password</label>
            </div>
            <div className="form-floating form-margin">
                <input id="confirm_passwrd" type="password" className="form-control" placeholder='abc' onChange={e => setConfirmPassword(e.target.value)} />
                <label htmlFor="confirm_passwrd">Confirm Password</label>
            </div>
            <div className="form-margin flex-end">
                <button type="submit" className="btn btn-secondary">Register</button>
            </div>
        </form>
    </div>
  )
}

export default NewUserForm;