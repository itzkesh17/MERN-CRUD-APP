import React, { useEffect, useState } from 'react';
import { getAPI } from './getAPI';
import './Styles/loginCss.scss';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [inputForm, setInputForm] = useState({
    name: '',
    password: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    async function userData() {
      try {
        const res = await fetch(getAPI);
        const data = await res.json();

        
        if (Array.isArray(data.data)) {
          setUsers(data.data);
          console.log('Users fetched:', data.data);
        } else {
          console.error('Unexpected structure in API response', data);
        }
      } catch (error) {
        console.error('Error while fetching data', error);
      }
    }

    userData();
  }, []);

  function validateUser() {
    let newError = {};

    if (inputForm.name.trim() === '') {
      newError.name = 'name is required';
    }
    if (inputForm.password.trim() === '') {
      newError.password = 'password is required';
    }
    setError(newError);

    setTimeout(() => {
      setError({});
    }, 3000);

    return Object.keys(newError).length === 0;
  }

  function loginSubmit(e) {
    e.preventDefault();

    if (!validateUser()) {
      return;
    }

    console.log('Users array before login check:', users);

    
    const person = users.find(
      (user) =>
        user.username === inputForm.name && user.password === inputForm.password
    );

    if (person) {
      toast.success('Logged In Successfully!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Flip,
      });
      setInputForm({
        name: '',
        password: '',
      });
    } else {
      toast.error('Invalid Details!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        transition: Flip,
      });
    }
  }

  return (
    <div className="login-container">
      <div className="login-sub">
        <h1>Login</h1>
        <form onSubmit={loginSubmit}>
          <input
            type="text"
            placeholder="username"
            value={inputForm.name}
            onChange={(e) =>
              setInputForm({ ...inputForm, name: e.target.value })
            }
          />
          <span>{error.name}</span>
          <input
            type="password"
            placeholder="password"
            value={inputForm.password}
            onChange={(e) =>
              setInputForm({ ...inputForm, password: e.target.value })
            }
          />
          <span>{error.password}</span>
          <input
            type="submit"
            value="Login"
            style={{
              backgroundColor: 'orange',
              width: '5rem',
              cursor: 'pointer',
              alignSelf: 'start',
              marginLeft: '1rem',
            }}
          />
        </form>
        <p>Don't have an Account? Create One </p>
      </div>
      <div className="button-port">
        <button>
          <Link to="/create">Create Account</Link>
        </button>
        <button>
          <Link to="/read">Read Details</Link>
        </button>
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

export default LoginForm;
