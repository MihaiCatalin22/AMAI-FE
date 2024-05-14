import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'; 
import UserService from '../../Services/UserService';
import "../../Style/Pages.css";

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
    <div>
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      <form className="flex-form-container" onSubmit={handleSubmit} autoComplete='off'>
        <div><label className="page-tittle">Register</label></div>

        <div className="input-group">
          <label className="medium-text">Username:</label>
          <input className="input" type="text" name="username" value={formData.username} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label className="medium-text">Password:</label>
          <input className="input" type="password" name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label className="medium-text">Email:</label>
          <input className="input" type="email" name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div className="input-group">
          <label className="medium-text">Full Name:</label>
          <input className="input" type="text" name="fullName" value={formData.fullName} onChange={handleChange}/>
        </div>
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}

const SuccessModal = ({onClose}) => {
  return (
    <div className="modalOverlayStyle">
      <div className="modalStyle">
        <h4>Registration Successful!</h4>
        <p>You have successfully registered. You can now log in.</p>
        <button onClick={onClose} style={closeButtonStyle}>Close</button>
      </div>
    </div>
  );
};

// Styles for the modal


const closeButtonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  fontSize: '16px',
  cursor: 'pointer',
};
export default RegisterForm;