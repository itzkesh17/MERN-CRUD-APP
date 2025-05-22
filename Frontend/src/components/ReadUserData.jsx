import { useEffect, useState } from 'react';
import { getAPI } from './getAPI';
import { deleteAPI } from './deleteAPI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Styles/readCss.scss';
import gif from '../assets/gif.gif';
import { MdDeleteForever, MdEditSquare } from 'react-icons/md';
import { ToastContainer, toast, Flip } from 'react-toastify';

const ReadUserData = () => {
  const [readData, setReadData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(getAPI);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setReadData(result.data);
        } else {
          console.error('Invalid data format:', result);
          setReadData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${deleteAPI}/${id}`);
      const response = await fetch(getAPI);
      const result = await response.json();
      setReadData(Array.isArray(result.data) ? result.data : []);

      toast.success('Item deleted successfully!', toastOptions);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete item.', toastOptions);
    }
  };

  const editItem = (user) => {
    const userDetails = {
      id: user._id,
      name: user.username,
      password: user.password,
      phone: user.phonenumber,
      city: user.city,
    };

    localStorage.setItem('Users', JSON.stringify(userDetails));
    navigate('/edit');
  };

  const toastOptions = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    transition: Flip,
  };

  return (
    <div
      style={{
        backgroundImage: `url(${gif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div className="read-container">
        <div className="read-sub">
          <h1>Read Data</h1>
          <table>
            <thead>
              <tr>
                <th>iD</th>
                <th>name</th>
                <th>password</th>
                <th>phone</th>
                <th>city</th>
                <th>delete</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {readData.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phonenumber}</td>
                  <td>{user.city}</td>
                  <td>
                    <button onClick={() => deleteItem(user._id)}>
                      <MdDeleteForever className="delete-icon" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => editItem(user)}>
                      <MdEditSquare className="edit-icon" />
                    </button>
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>

          <button
            onClick={() => {
              localStorage.removeItem('Users');
              navigate('/');
            }}
          >
            Back to Login
          </button>
        </div>
      </div>

      <ToastContainer {...toastOptions} />
    </div>
  );
};

export default ReadUserData;
