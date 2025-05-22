import React, { useEffect, useState } from 'react';
import { updateAPI } from './updateAPI';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Styles/editCss.scss';
import gif from '../assets/gif.gif';
import { ToastContainer, toast, Flip } from 'react-toastify';

const EditUserData = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    password: '',
    phone: '',
    city: ''
  });

  const [error, setError] = useState({});
  const [getId, setGetId] = useState(0);
  const navi = useNavigate();

  function validateForm() {
    let newError = {};

    const nameCondition = /^[A-Z]+$/;
    const passwordCondition =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneCondition = /^[0-9]{10}$/;

    if (formInput.name.trim() === '') {
      newError.name = 'Name is required';
    } else if (!nameCondition.test(formInput.name)) {
      newError.name = 'Name should be all uppercase letters';
    }

    if (formInput.password.trim() === '') {
      newError.password = 'Password is required';
    } else if (!passwordCondition.test(formInput.password)) {
      newError.password = 'Password must contain at least 8 all characters';
    }

    if (formInput.phone.trim() === '') {
      newError.phone = 'Phone number is required';
    } else if (!phoneCondition.test(formInput.phone)) {
      newError.phone = 'Phone number should be 10 digits';
    }

    if (formInput.city.trim() === '') {
      newError.city = 'City is required';
    }

    setError(newError);

    setTimeout(() => {
      setError({});
    }, 5000);

    return Object.keys(newError).length === 0;
  }

  const formClicked = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await axios.patch(`${updateAPI}/${getId}`, {
      username: formInput.name,
      password: formInput.password,
      phonenumber: formInput.phone,
      city: formInput.city
    });

    setFormInput({
      name: '',
      password: '',
      phone: '',
      city: ''
    });

    localStorage.clear();

    toast.success('Updated Successfully!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      transition: Flip
    });

    setTimeout(() => {
      navi('/read');
    }, 3000);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('Users'));

    if (storedUser) {
      setGetId(storedUser.id || 0);
      setFormInput({
        name: storedUser.name || '',
        password: storedUser.password || '',
        phone: String(storedUser.phone || ''),
        city: storedUser.city || ''
      });
    }
  }, []);

  return (
    <div style={{ backgroundImage: `url(${gif})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      <div className="edit-container">
        <div className="edit-sub">
          <h1>Update Details</h1>
          <form onSubmit={formClicked}>
            <input
              type="text"
              placeholder="UserName"
              value={formInput.name}
              onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
            />
            <span>{error.name}</span>

            <input
              type="password"
              placeholder="Password"
              value={formInput.password}
              onChange={(e) => setFormInput({ ...formInput, password: e.target.value })}
            />
            <span>{error.password}</span>

            <input
              type="text" 
              placeholder="Phone Number"
              value={formInput.phone}
              onChange={(e) => setFormInput({ ...formInput, phone: e.target.value })}
            />
            <span>{error.phone}</span>

            <input
              type="text"
              placeholder="City"
              value={formInput.city}
              onChange={(e) => setFormInput({ ...formInput, city: e.target.value })}
            />
            <span>{error.city}</span>

            <input type="submit" value="Update" style={{ backgroundColor: 'orange', width: '5rem', cursor: 'pointer', alignSelf: 'start', marginLeft: '1rem' }} />
          </form>
        </div>
      </div>
      <ToastContainer
        className="toast"
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
};

export default EditUserData;
