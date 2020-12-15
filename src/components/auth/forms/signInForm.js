import { refs } from '../../../refs/refs';
import { signIn } from '../../../api/api';
import { state } from '../../../data/data';
export const createSignInForm = () => {
  const user = {
    email: '',
    password: '',
  };

  const resetUser = () => {
    user.email = '';
    user.password = '';
    refs.signInForm.reset();
  };
  refs.content.innerHTML = `<h2>Sign In Form</h2>
    <form name="signInForm">
      <input type="text" name="email" />
      <input type="text" name="password" />
      <span class="errorIn"></span>
      <button type="submit">SignIn</button>
    </form>`;
  refs.signInForm = document.forms.signInForm;
  const getUserData = e => {
    if (state.error) {
      document.querySelector('.error').textContent = '';
      refs.errorIn.textContent = '';
      state.error = '';
    }
    const { name, value } = e.target;
    user[name] = value;
  };
  const signInData = async e => {
    e.preventDefault();
    signIn(user)
      .then(resetUser)
      .then(() => {
        refs.navigation
          .querySelector('[data-page="signUp"]')
          .classList.toggle('hidden');
        refs.navigation
          .querySelector('[data-page="signIn"]')
          .classList.toggle('hidden');
        refs.navigation
          .querySelector('[data-page="logOut"]')
          .classList.toggle('hidden');
      });
  };
  refs.signInForm.addEventListener('input', getUserData);
  refs.signInForm.addEventListener('submit', signInData);
};
