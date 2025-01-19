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
