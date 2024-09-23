import axios from 'axios';
import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const ress = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (ress.data.status === 'success') {
      showAlert('success', 'Successfully logged in');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
    console.log(ress);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
