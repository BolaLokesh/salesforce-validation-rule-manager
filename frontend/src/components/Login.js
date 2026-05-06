import React from 'react';

function Login() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/api/login';
  };

  return (

    <div className='container'>

      <h1 className='heading'>
        Salesforce Validation Rule Manager
      </h1>

      <button className='login-btn' onClick={handleLogin}>
        Login with Salesforce
      </button>

    </div>
  );
}

export default Login;