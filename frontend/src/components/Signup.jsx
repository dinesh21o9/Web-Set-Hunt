import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import '../styles/Signup.css';
import axios from 'axios';

export const Signup = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef(); 
  const repasswordRef = useRef(); 

  function loginStatus() {
    if(localStorage.getItem('userId') ?? "" !== "") {
      window.location.href = '/lobby';
    }
  }
  loginStatus();


  const handleSubmit = async(event) => {
    event.preventDefault(); 
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repassword = repasswordRef.current.value;
    // Handle form submission logic here

    try{
      const {data} = await axios.post('http://localhost:5000/api/auth/register', {
        email: email,
        password: password,
        confirmPassword: repassword
      })
      localStorage.clear();
      sessionStorage.clear(); 
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('userId', data.user._id);
      if(data.status){
        sessionStorage.setItem("token",data.token);
        sessionStorage.setItem("userid",data.user['_id']);
      }
      if(data.msg === "Email Already used"){
        navigate('/login');
        toast.error("Email was already used");
      }
      else if(data.msg === "Confirm Password doesn't match"){
        navigate('/signup');
        toast.error("Confirm Password doesn't match");
      }
      else if(data.msg === "Confirm Password is required"){
        navigate('/signup');
        toast.error("Confirm Password is required");
      }
      else if(data.msg === "User registered successfully"){
        navigate('/lobby/team');
        toast.success("User registered successfully");
      }
      else{
        navigate('/signup');
      }
    }

    catch(error){
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='whSignup'>
      <img src="assets/finll.jpg" alt="Background"  className='bgImage'/>
      <div className="imageContainer1">
        <img src="assets/micro.png" alt="Micro" />
      </div>
      <div className="imageContainer2">
        <img src="assets/logo.svg" alt="Micro" />
      </div>
      <div className="techspardha">
        TechSpardha'24
      </div>
      <div className="subContainer">
        <div className="textContainer">
          CREATE ACCOUNT
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="formElement">
              <label htmlFor="email" className="formElement">Email</label>
              <input type="email" className="formElement" id="email" ref={emailRef} placeholder=" Enter your email address"/>
            </div>
            <div className="formElement">
              <label htmlFor="password" className="formElement">Password</label>
              <input type="password" className="formElement" id="password" ref={passwordRef} placeholder=" Enter your password" />
            </div>
            <div className="formElement">
              <label htmlFor="password" className="formElement">Re-Enter Password</label>
              <input type="password" className="formElement" id="password" ref={repasswordRef} placeholder=" Re Enter your password" />
            </div>
            <button type="submit" className="submitButton">SUBMIT</button>
          </form>
        </div>
        <div className="extraContainer">
          Already have an account? <Link to="/Login" className="switch">Login</Link>
        </div>
      </div>
    </div>
  );
};








import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ERROR_MESSAGES = {
  EMAIL_USED: 'Email Already used',
  PASSWORD_MISMATCH: "Confirm Password doesn't match",
  PASSWORD_REQUIRED: 'Confirm Password is required',
  REGISTRATION_SUCCESS: 'User registered successfully'
};

const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOBBY: '/lobby/team'
};

export const RegistrationHandler = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate('/lobby', { replace: true });
    }
  }, [navigate]);

  const handleUserStorage = (data) => {
    localStorage.clear();
    sessionStorage.clear();
    
    const { user, token } = data;
    
    localStorage.setItem('email', user.email);
    localStorage.setItem('userId', user._id);
    
    if (data.status) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userid', user._id);
    }
  };

  const handleRegistrationResponse = (data) => {
    const { msg } = data;

    switch (msg) {
      case ERROR_MESSAGES.EMAIL_USED:
        navigate(ROUTES.LOGIN);
        toast.error(msg);
        break;
      case ERROR_MESSAGES.PASSWORD_MISMATCH:
      case ERROR_MESSAGES.PASSWORD_REQUIRED:
        navigate(ROUTES.SIGNUP);
        toast.error(msg);
        break;
      case ERROR_MESSAGES.REGISTRATION_SUCCESS:
        navigate(ROUTES.LOBBY);
        toast.success(msg);
        break;
      default:
        navigate(ROUTES.SIGNUP);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repasswordRef.current.value
    };

    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      handleUserStorage(data);
      handleRegistrationResponse(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Registration error:', errorMessage);
      toast.error(errorMessage);
    }
  };

  return { handleSubmit };
};