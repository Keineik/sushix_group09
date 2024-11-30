import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'

const PrivateLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hi Thuy
    let userRole;
    if (username === 'company' && password === 'company') {
      userRole = 'company';
      navigate('/admin/company');
    } else if (username === 'branch' && password === 'branch') {
      userRole = 'branch';
      navigate('/admin/branch');
    } else {
      userRole = 'staff';
      navigate('/staff');
    }
    localStorage.setItem('userRole', userRole);
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleLogin}>
        <img className='mb-5' src={logo} alt="aaa" />
        <h1 className="h3 mb-3 fw-normal text-center">Admin/Staff Log In</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-danger w-100 py-2" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2024–2024</p>
        <p className='text-body-tertiary'>Hint:</p>
        <p className='text-body-tertiary'>staff/staff</p>
        <p className='text-body-tertiary'>branch/branch</p>
        <p className='text-body-tertiary'>company/company</p>
      </form>
    </main>
  );
};

export default PrivateLogin;