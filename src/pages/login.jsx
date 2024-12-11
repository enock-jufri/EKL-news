import React, { useState } from 'react';

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFormSwitch() {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', email: '', password: '' });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp) {
      console.log('Signing Up:', formData);
    } else {
      console.log('Logging In:', { email: formData.email, password: formData.password });
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        {isSignUp && (
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />

        <input  type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />

        <button type="submit" className="submit-btn">{isSignUp ? 'Sign Up' : 'Log In'}</button>
        
        <p className="form-switch-text">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span className="form-switch-link" onClick={handleFormSwitch}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;