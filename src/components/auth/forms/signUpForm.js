import { refs } from '../../../refs/refs';
import { signUp } from '../../../api/api';
import { state } from '../../../data/data';
export const createSignUpForm = () => {
  const user = {
    email: '',
    password: '',
  };

  const resetUser = () => {
    user.email = '';
    user.password = '';
    refs.signUpForm.reset();
  };
  refs.content.innerHTML = `<h2>Sign Up Form</h2>
        <form name="signUpForm">
          <input type="text" name="email" />
          <input type="text" name="password" />
          <span class="error"></span>
          <button type="submit">SignUp</button>
        </form>`;
  refs.signUpForm = document.forms.signUpForm;
  const getUserData = e => {
    if (state.error) {
      document.querySelector('.error').textContent = '';
      refs.errorIn.textContent = '';
      state.error = '';
    }
    const { name, value } = e.target;
    user[name] = value;
  };
  const signUpData = e => {
    e.preventDefault();
    signUp(user).then(resetUser);
  };
  refs.signUpForm.addEventListener('input', getUserData);
  refs.signUpForm.addEventListener('submit', signUpData);
};
