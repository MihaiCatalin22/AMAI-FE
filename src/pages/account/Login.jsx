import React, { useState } from "react";
import "../../Style/Pages.css";
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
        <div className="modalOverlayStyle">
            <div className="modalContentStyle">
                <p>Logged in successfully!</p>
            </div>
        </div>
    );
};

export default Login;