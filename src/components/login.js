/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import loginLogo from '../assets/images/blogo.svg';
import '../assets/css/_signin.scss';
import { useNavigate } from "react-router-dom";

const loginDetails = [
  {
    email: 'pragya@gmail.com',
    password: 'test@1234'
  }
];

function LoginForm() {

  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(false);
  const [user, setUser] = useState({});

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setUser({ ...user, email: value });  //... means spread operator
  }

  const onChangePassword = (e) => {
    const value = e.target.value;
    setUser({ ...user, password: value });
  }

  const SubmitLogin = (e) => {

    e.preventDefault(); //not reload/refresh the page
    const validUser = loginDetails.filter(item => {
      if (item.email === user.email && item.password === user.password) {
        return item;
      }
    })

    if (validUser.length != 0) {
      setInvalid(false);
      navigate('/dashboard');
    }
    else {
      setInvalid(true);
    }

  }

  return (
    <div className="form-signin">
      <form className='w-100'>
        <img className="mb-4" src={loginLogo} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input type="email" value={'pragya@gmail.com'} className="form-control" id="floatingInput" placeholder="Email Id" onChange={onChangeEmail} />
        </div>
        <div className="form-floating">
          <input type="password" value={'test@1234'} className="form-control" id="floatingPassword" onChange={onChangePassword} placeholder="Password" />
        </div>

        <div className='d-flex'>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          {/* <div className="register">
            <a onClick={()=>{navigate('/register')}} >Register</a>
          </div> */}
        </div>

        {invalid ?
          <p className='error-msg'>Invalid User</p>
          :
          <></>
        }

        <button className="w-100 btn btn-lg btn-primary" type='submit' onClick={SubmitLogin}>Sign Up </button>
      </form>
    </div>
  );
}

export default LoginForm;