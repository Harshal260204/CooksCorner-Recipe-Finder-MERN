import React, { useState } from 'react';
import '../../Styles/Forms.css';
import axios from 'axios';

function LoginForm() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [erros,setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // try {
    //   const response = await fetch('http://localhost:3000/user/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });
  
    //   if (response.ok) {
    //     const responseData = await response.json();
  
    //     console.log("Login Response Data:", responseData);
  
    //     if (responseData && responseData.user) {
    //       // Store the token and user data
    //       localStorage.setItem('token', responseData.token);
    //       saveToken(responseData.token);
    //       setUserDetails(responseData.user);
    //     }
  
    //     setFormData({ email: '', password: '' });
  
    //     alert('Login Successful');
    //     navigate('/');
    //   } else {
    //     const errorData = await response.json();
    //     alert(errorData.message || 'Login Failed');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   alert('An error occurred. Please try again.');
    // }

    const res = await axios.post("http://localhost:3000/user/login",{email,password})
  };
  
  
  
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <h3 className="text-center mb-4" style={{ color: '#626F47', fontWeight: 'bold' }}>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#626F47', color: 'white' }}>Login</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/register-page" className="text-decoration-none" style={{ color: '#CB9DF0' }}>Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
