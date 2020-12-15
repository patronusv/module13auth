import { refs } from './refs/refs';
import { signUp, signIn, logOut } from './api/api';
import './styles.css';
import { state } from './data/data';
import { createSignUpForm } from './components/auth/forms/signUpForm';
import { createSignInForm } from './components/auth/forms/signInForm';
import { createHome } from './components/pages/home';
createHome();
const getPage = e => {
  if (e.target === e.currentTarget) {
    return;
  }
  switch (e.target.dataset.page) {
    case 'signUp':
      createSignUpForm();
      break;
    case 'signIn':
      createSignInForm();
      break;
    case 'home':
      createHome();
      break;
    case 'logOut':
      createHome();
      break;
    default:
      createHome();
      break;
  }

  // if (e.target.dataset.page === 'signUp') {
  //   createSignUpForm();
  // }
  // if (e.target.dataset.page === 'signIn') {
  //   createSignInForm();
  // }
};

refs.navigation.addEventListener('click', getPage);
// const getUserData = e => {
//   if (state.error) {
//     document.querySelector('.error').textContent = '';
//     refs.errorIn.textContent = '';
//     state.error = '';
//   }
//   const { name, value } = e.target;
//   user[name] = value;
// };

// const signUpData = e => {
//   e.preventDefault();
//   signUp(user).then(resetUser);
// };

// const signInData = async e => {
//   e.preventDefault();
//   signIn(user).then(resetUser);
// };

// __signUpForm

// __signInForm

// __logout
const logOutHandler = () => {
  logOut();
  refs.navigation
    .querySelector('[data-page="signUp"]')
    .classList.toggle('hidden');
  refs.navigation
    .querySelector('[data-page="signIn"]')
    .classList.toggle('hidden');
  refs.navigation
    .querySelector('[data-page="logOut"]')
    .classList.toggle('hidden');
};
refs.navigation
  .querySelector('[data-page="logOut"]')
  .addEventListener('click', logOutHandler);
