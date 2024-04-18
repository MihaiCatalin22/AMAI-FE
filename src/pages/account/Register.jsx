import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserService from '../../Services/UserService';
import '../style/RegisterForm.css'

function RegisterForm() {
  const queryString = window.location.href;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.register(formData, queryString).then(result => {
        if(result.data === "register_success"){
            setShowSuccessModal(true);
            navigate('/registerSuccess');
        }
    }).catch(error => {
        console.error('Registration failed:', error);
        // Optionally handle errors, e.g., display an error message to the user
    });
    console.log(formData);
  };

  return (
    <div className="container">
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      <h2>Register</h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className="input-group">
          <label className="label">Username:</label>
          <input className="input" type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="label">Password:</label>
          <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="label">Email:</label>
          <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label className="label">Full Name:</label>
          <input className="input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>
        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
}

const SuccessModal = ({ onClose }) => {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <h4>Registration Successful!</h4>
        <p>You have successfully registered. You can now log in.</p>
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
};

// Styles for the modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '10px',
  width: '300px',
  textAlign: 'center',
};

const closeButtonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  fontSize: '16px',
  cursor: 'pointer',
};
export default RegisterForm;