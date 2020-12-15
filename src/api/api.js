import axios from 'axios';
import { state } from '../data/data';
import { refs } from '../refs/refs';

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
    console.log('token', token);
    axios
      .get(`${baseURL}/users.json?auth=${token}`)
      .then(response => console.log(response.data));
  } else console.log('no token');
};

// const setToDB =() => {
//   const token = JSON.parse(localStorage.getItem('idToken'));
//   axios.post(`${baseURL}/users.json?auth=${token}`, {email: "test", password: "test"})
// }

export { signUp, signIn, addToDB, getFromDB, logOut };
