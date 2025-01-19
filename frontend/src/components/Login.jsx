import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../styles/Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  function loginStatus() {
    if(localStorage.getItem('userId') ?? "" !== "") {
      window.location.href = '/lobby';
    }
  }
  loginStatus();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { data } = await axios.post('https://wsh.vistaran.tech/api/auth/login', {
        email,
        password
      });

      // Corrected local storage syntax
      console.log(data);
      localStorage.clear();
      sessionStorage.clear(); 

      localStorage.setItem('email', data.userDetails.email);
      if(data.userDetails.username !== undefined) {
        localStorage.setItem('username', data.userDetails.username);
      }
      if(data.userDetails.mobileNo !== undefined) {
        localStorage.setItem('mobileNo', data.userDetails.mobileNo);
      }
      if(data.userDetails.rollNo) {
        localStorage.setItem('rollNo', data.userDetails.rollNo);
      }
      
      localStorage.setItem('userId', data.userDetails._id);
      
      if(data.msg!=='User has logged in but is not a member of any team'){
        localStorage.setItem('teamId', data.team._id);
        localStorage.setItem('teamName', data.team.teamName);
        localStorage.setItem('teamCode', data.team.teamCode);
        sessionStorage.setItem("teamid",data.team._id);
      }


      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userid", data.userDetails._id);
      

      // if (data.status) {
      //   sessionStorage.setItem("token", data.token);
      //   if (data.user) {
      //     sessionStorage.setItem("userid", data.user._id);
      //   }
      // }

      if (data.msg === 'User Not found') {
        navigate('/login');
        toast.error('User Not found');
      } else if (data.msg === 'User has logged in but is not a member of any team') {
        navigate('/lobby/team');
        toast.success('User Logged In Successfully');
      } else if (data.msg === 'User logged in and joined a team') {
        navigate('/lobby');
        toast.success('User Logged In Successfully');
      } else {
        navigate('/login');
        toast.error('Incorrect Password');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      // Set the error message state variable
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="whLogin">
      <img src="assets/finll.jpg" alt="Background" className='bgImage' />
      <div className="imageContainer1">
        <img src="assets/micro.png" alt="Micro" />
      </div>
      <div className="imageContainer2">
        <img src="assets/logo.svg" alt="Micro" />
      </div>
      <div className="techspardha">
        TechSpardha'24
      </div>
      <div className="subContainer" style={{ top: '20%' }}>
        <div className="textContainer">
          LOG-IN
        </div>
        <div className="formContainer">
          <div className="lineContainer">
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formElement">
              <label htmlFor="email" className="formElement">Email</label>
              <input type="email" className="formElement" id="email" ref={emailRef} placeholder=" Enter your email address" />
            </div>
            <div className="formElement">
              <label htmlFor="password" className="formElement">Password</label>
              <input type="password" className="formElement" id="password" ref={passwordRef} placeholder=" Enter your password" />
            </div>
            <button type="submit" className="submitButton">Log In</button>
          </form>
          {/* Conditional rendering of error message */}
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
        <div className="extraContainer">
          Don't have an account? <Link to="/Signup" className='switch'>SignUp</Link>
        </div>
      </div>
    </div>
  );
};
