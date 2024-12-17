import React, { useState } from 'react';

function Login() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);  // Manage loading state
  const [error, setError] = useState('');  // Handle error messages

  // Handle input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Switch between signup and login forms
  function handleFormSwitch() {
    setIsSignUp(!isSignUp);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isSignUp ? '/api/signup' : '/api/login'; // Define endpoint
    const body = isSignUp
      ? { username: formData.username, email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password };

    try {
      // Make the API call
      const response = await fetch(`mongodb://localhost:27017/auth-example/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }

      // Handle successful response
      if (isSignUp) {
        console.log('User signed up successfully:', result);
        alert('Sign up successful! Please log in.');
        handleFormSwitch(); // Switch to login form after successful signup
      } else {
        localStorage.setItem('token', result.token); // Store JWT token
        console.log('User logged in successfully:', result);
        alert('Login successful! Redirecting...');
        // Perform redirection or app initialization here
      }
    } catch (err) {
      setError(err.message); // Set error for display
    } finally {
      setLoading(false); // Stop the loading spinner
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
