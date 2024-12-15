import React, { useState } from 'react';

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');  

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleFormSwitch() {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', email: '', password: '' });
    setError('');  
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');  

    const url = isSignUp ? '/api/signup' : '/api/login'; 
    const body = isSignUp
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      if (isSignUp) {
        console.log('User signed up successfully:', result);
      } else {
        
        localStorage.setItem('token', result.token);
        console.log('User logged in successfully:', result);
      }

      setFormData({ username: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);  
    } finally {
      setLoading(false);  
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>

        {isSignUp && (
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required  />
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />

        {loading ? (
          <button type="button" disabled className="submit-btn">
            Loading...
          </button>
        ) : (
          <button type="submit" className="submit-btn">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        )}

        {error && <p className="error-text">{error}</p>}

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
