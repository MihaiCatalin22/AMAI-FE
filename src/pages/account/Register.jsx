import React, { useState, useHistory } from 'react';
import UserService from '../../Services/UserService';
import '../style/RegisterForm.css'

function RegisterForm() {
  const queryString = window.location.href;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.register(formData, queryString).then(result =>{
        if(result.data === "register_success"){
            useHistory.push('/registerSuccess');
        }
    });
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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

export default RegisterForm;