import React, { useState } from "react";
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        setShowSuccessModal(true); 
        setTimeout(() => {
            navigate('/home');
        }, 2000);
    }
    return (
      <div className="container">
        <h2>Login to your account</h2>
        <form onSubmit={handleLogin} className="form-container" >
          <div className="input-group">
            <label className="label" htmlFor="username">Username:</label>
            <input type="text" id="username" className="input" autoComplete="off" required />
          </div>
          <div className="input-group">
            <label className="label" htmlFor="password">Password:</label>
            <input type="password" id="password" className="input" required />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        {showSuccessModal && <LoginSuccessModal />}
      </div>
    );
  }

  const LoginSuccessModal = () => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <p>Logged in successfully!</p>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
};

export default Login;