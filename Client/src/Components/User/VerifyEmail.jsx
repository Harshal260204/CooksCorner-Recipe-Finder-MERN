import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/users/verify-email/${token}`);
        setMessage(response.data.message);
        setIsSuccess(true);
        setLoading(false);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate('/login-page');
        }, 3000);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Email verification failed');
        setIsSuccess(false);
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('Invalid verification token');
      setLoading(false);
    }
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <h2>Email Verification</h2>
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Verifying your email...</p>
          </div>
        ) : (
          <div className={`message ${isSuccess ? 'success' : 'error'}`}>
            <p>{message}</p>
            {isSuccess && (
              <p>You will be redirected to the login page shortly...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;