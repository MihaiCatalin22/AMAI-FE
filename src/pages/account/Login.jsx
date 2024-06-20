import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../Style/Pages.css";
import { useAuth } from "../../contexts/authContext";
import userService from "../../Services/UserService";

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
          const response = await userService.login({ username, password });
          if (response.jwt) {
            loginUser({
              ...response,
              username: response.username,
              token: response.jwt
            });
            setShowSuccessModal(true);
            setTimeout(() => {
            navigate('/home');
            }, 2000);
          } else {
            setError("Authentication token not received.");
          }
        } catch (error) {
          console.error('Error during login:', error);
          const errMsg = error.response && error.response.data ? error.response.data.message : "Login failed due to an unexpected issue.";
          setError(errMsg);
        }
      };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (

      <div>
          <form onSubmit={handleLogin} className="flex-form-container">
          <br></br>
              <div><label className="page-tittle">Login to your account</label></div>
              <div className="input-group">
                  <label className="medium-text" htmlFor="username">Username:</label>
                  <input 
                    type="text" 
                    id="username" 
                    className="input" 
                    autoComplete="off" 
                    required 
                    value={username} 
                    onChange={handleUsernameChange} 
                  />
              </div>
              <div className="input-group">
                  <label className="medium-text" htmlFor="password">Password:</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="input" 
                    required 
                    value={password} 
                    onChange={handlePasswordChange} 
                  />
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
            <div className="modalContentStyle messages">
                <p>Logged in successfully!</p>
            </div>
        </div>
    );
};

export default Login;