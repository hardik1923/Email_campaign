import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { setemail } from './features/counter/counterSlice';
import './login.css' 
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const LoginSignupForm = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:'', 
    lastname:'',
    confirmPassword:'',
    username:'',
  });

  const [isSignup, setIsSignup] = useState(false); // Flag for signup/login mode
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(token !== ""){
      alert('you must be logged in')
      toast.success("You already logged in");
      navigate("/allcampaigns");
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setErrorMessage(''); // Clear error message when switching modes
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = isSignup
      ? 'http://localhost:3000/users/signup' // Signup API endpoint
      : 'http://localhost:3000/users/login'; // Login API endpoint

    try {
        const response=await fetch(url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });

          if(response.status===200){
            dispatch(setemail({email:formData.email}));
            localStorage.setItem('userEmail', formData.email);
            navigate('/allcampaigns',{ state: { email: formData.email } });
          }else
          if(response.status===200){
            alert("user created successfully")
            navigate('/allcampaigns');
          }

          //response.then((response) => response.json()).then((responseData) =>console.log('responseData', responseData))
       // Handle successful operation (signup or login)
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  const handleRegisterSubmit = async (e) => {

    e.preventDefault();
    const url = isSignup
      ? 'http://localhost:3000/api/v1/register' // Signup API endpoint
      : 'http://localhost:3000/api/v1/login';
      console.log(formData);
      if(isSignup ){
        if(formData.name.length > 0 && formData.lastname.length > 0 && formData.email.length > 0 && formData.password.length > 0 && formData.confirmPassword.length > 0){
          if(formData.password === formData.confirmPassword){
            toast.error("Passwords don't match");
          }
          if(!isSignup || formData.password === formData.confirmPassword ){
            formData.username=formData.name+' '+formData.lastname;
            try{
            const response = await axios.post(url, formData);
             toast.success("Registration successfull");
             dispatch(setemail({email:formData.email}));
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('auth', JSON.stringify(response.data.token));
                navigate('/allcampaigns',{ state: { email: formData.email } });
           }catch(err){
            console.log(err);
             toast.error(err.message);
           }
          }else{
            toast.error("Passwords don't match");
          }
        
    
        }else{
          toast.error("Please fill all inputs");
        }
    
      }
      else{
        if(formData.email.length > 0 && formData.password.length > 0){
          try{
            const response = await axios.post(url, formData);
             toast.success("Login successfull");
             dispatch(setemail({email:formData.email}));
             localStorage.setItem('userEmail', formData.email);
             localStorage.setItem('auth', JSON.stringify(response.data.token));
             navigate('/allcampaigns', { state: { email: formData.email } });
           }catch(err){
            console.log(err);
             toast.error(err.message);
           }
        }else{
          toast.error("Please fill all inputs");
        }
      }
      };
      const notify = () => toast('Here is your toast.');
      const checktostify=()=>{
        console.log('Check')
        toast("Wow so easy!");
      }

  return (
    <div className='container'>
      <form onSubmit={handleRegisterSubmit} className='login-form'>
      <h2 className='form-header'>{isSignup ? 'Signup' : 'Login'}</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}  
        <div className='form-row'>          
      {isSignup&&<label htmlFor="name">First Name:</label>}
      {isSignup&&<input className='input'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />       }
        </div>

        <div className='form-row'>
        {isSignup&&<label htmlFor="lastname">lastname:</label>}
      {isSignup&&<input className='input'
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />       }
        </div> 

        <div className='form-row'>
        <label htmlFor="email">Email:</label>
        <input className='input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        <div className='form-row'>
          
        <label htmlFor="password" className='label'>Password:</label>
        <input className='input'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        </div>
        <div className='form-row'>
        {isSignup&&<label htmlFor="lastname">confirmPassword:</label>}
      {isSignup&&<input className='input'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />       } 
        </div>
        <div className="form-row">
        <button type="submit" className='button'>{isSignup ? 'Signup' : 'Login'}</button>
        </div>
        <div className='form-row'>
        {isSignup ? 'Already have an account?' : 'Don\'t have an account?'}
        <button className='loginorsignup-btn'type='submit' onClick={toggleMode}> {isSignup ? 'Login' : 'Signup'}</button>
      </div>
      </form>

      
    </div>
  );s
};

export default LoginSignupForm;
