import React, { useState } from 'react';
import '../../Styles/Forms.css';

function RegisterPage() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      alert("Registration successful!");
      console.log("Form Data:", formData);
    } else {
      setErrors(newErrors);
    }

    try {
      const response = await fetch("http://localhost:3000/user/register",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body: JSON.stringify(formData),
      });

      if(response.ok){
        const responseData = await response.json();
        setFormData({
          username:"",
          email:"",
          password:"",
          confirmPassword:"",
        });
        Navigate("/Login")
      }else{
        alert("Error")
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <h3 className="text-center mb-4" style={{ color: '#6A1E55', fontWeight: 'bold' }}>Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username? "is-Invalid": ""}`}
              id="username"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email? "is-invalid": ""}`}
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" :""}`}
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid":""}`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#6A1E55', color: 'white' }}>Register</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <a href="/LoginForm" className="text-decoration-none" style={{ color: '#CB9DF0' }}>Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
