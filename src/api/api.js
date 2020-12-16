import axios from 'axios';
import { state } from '../data/data';
import { refs } from '../refs/refs';
import { createUsersList } from '../components/users/usersList/usersList';

const API_KEY = 'AIzaSyBXbN35WLu4cQm039WuSMqlkkgW1BKJVso';
const signUpURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const signInURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const baseURL = 'https://lessonauth-c40fa-default-rtdb.firebaseio.com';

const signUp = async user => {
  refs.loader.classList.toggle('loader');
  try {
    const response = await axios.post(signUpURL, {
      ...user,
      returnSecureToken: true,
    });
    const data = { email: response.data.email, localId: response.data.localId };
    const token = response.data.idToken;
    addToDB(data, token);
  } catch (error) {
    // throw error;
    state.error = error.response.data.error.message;
    document.querySelector('.error').textContent =
      error.response.data.error.message;
  } finally {
    refs.loader.classList.toggle('loader');
  }
};

const signIn = async user => {
  refs.loader.classList.toggle('loader');
  try {
    const response = await axios.post(signInURL, {
      ...user,
      returnSecureToken: true,
    });
    localStorage.setItem('idToken', JSON.stringify(response.data.idToken));
    getFromDB();
  } catch (error) {
    refs.errorIn.textContent = error.response.data.error.message;
    state.error = error.response.data.error.message;
    throw new Error(state.error);
  } finally {
    refs.loader.classList.toggle('loader');
  }
};

const logOut = () => {
  localStorage.clear();
};

const addToDB = async (data, token) => {
  try {
    await axios.post(`${baseURL}/users.json?auth=${token}`, data);
  } catch (error) {
    console.dir(error);
  }
};

const getFromDB = () => {
  if (localStorage.getItem('idToken')) {
    const token = JSON.parse(localStorage.getItem('idToken'));
    // console.log('token', token);
    axios.get(`${baseURL}/users.json?auth=${token}`).then(response => {
      const keys = Object.keys(response.data);
      const users = keys.reduce((acc, key) => {
        acc.push({ id: key, ...response.data[key] });
        return acc;
      }, []);
      state.data.users = [...users];
      console.log(state.data.users);
      createUsersList();
    });
  } else console.log('no token');
};

// const setToDB =() => {
//   const token = JSON.parse(localStorage.getItem('idToken'));
//   axios.post(`${baseURL}/users.json?auth=${token}`, {email: "test", password: "test"})
// }

const deleteUserByID = id => {
  const token = JSON.parse(localStorage.getItem('idToken'));
  axios.delete(`${baseURL}/users/${id}.json?auth=${token}`).then(() => {
    state.data.users = [...state.data.users.filter(user => user.id !== id)];
    createUsersList();
  });
};

const editUser = (id, user) => {
  const token = JSON.parse(localStorage.getItem('idToken'));
  axios.put(`${baseURL}/users/${id}.json?auth=${token}`, user);
};

export { signUp, signIn, addToDB, getFromDB, logOut, deleteUserByID, editUser };
