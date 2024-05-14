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

      <div>
          <form onSubmit={handleLogin} className="flex-form-container">
          <br></br>
              <div><label className="page-tittle">Login to your account</label></div>
              <div className="input-group">
                  <label className="medium-text" htmlFor="username">Username:</label>
                  <input type="text" id="username" className="input" autoComplete="off" required/>
              </div>
              <div className="input-group">
                  <label className="medium-text" htmlFor="password">Password:</label>
                  <input type="password" id="password" className="input" required/>
              </div>
              <button type="submit" className="button">Login</button>
          </form>
          {showSuccessModal && <LoginSuccessModal/>}
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