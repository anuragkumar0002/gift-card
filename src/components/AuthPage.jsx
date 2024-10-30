import React, { useState } from 'react';
import '../css/AuthPage.css';
import companyLogo from '../resources/logo1.png'; // Update with the path to your logo
import 'font-awesome/css/font-awesome.min.css';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login API call
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const { token } = await response.text();
        localStorage.setItem('authToken', token); // Store token in localStorage
        window.location.href = '/home'; // Redirect to homepage
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } else {
      // Registration API call
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (response.ok) {
        alert('Account created, please log in.');
      } else {
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
        <h1 className="company-name">Gift Card</h1> {/* Update with your company name */}
      </div>
      <div className="auth-box">
        <div className="left-side">
          <h2>{isLogin ? "Welcome Back!" : "Hello, Friend!"}</h2>
          <p>{isLogin ? "To keep connected with us please login with your personal info" : "Enter your personal details and start your journey with us"}</p>
          <button onClick={toggleForm} className="switch-btn">
            {isLogin ? "SIGN UP" : "SIGN IN"}
          </button>
        </div>
        <div className="right-side">
          {isLogin ? (
            <>
              <h2>Sign In</h2>
              <form className="auth-form" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="auth-btn">SIGN IN</button>
                <a href="/forgot-password" className="forgot-password">Forgot Password?</a> {/* Added forgot password link */}
              </form>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <div className="social-login">
                <i className="fa fa-facebook"></i>
                <i className="fa fa-google"></i>
                <i className="fa fa-linkedin"></i>
              </div>
              <p>or use your email for registration:</p>
              <form className="auth-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="auth-btn">SIGN UP</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
