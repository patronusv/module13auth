import { refs } from '../../../refs/refs';
import { state } from '../../../data/data';
import { editUser } from '../../../api/api';

function toDataURL(element) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onloadend = () => resolve(reader.result);
  });
}

export const createUserForm = id => {
  const editableUser = state.data.users.find(user => user.id === id);
  console.log(editableUser);
  const user = {
    email: editableUser.email,
    localId: editableUser.localId,
    firstName: '',
    lastName: '',
    avatar: '',
  };
  document.querySelector('.usersDataContent').innerHTML = `
    <form name="userForm">
    <label>Avatar: 
    <input type="file" name="avatar">
        </label>
    <label>Email: 
    <input type="text" name="email">
        </label>
        <label>ID:
        <input type="text" name="localId">
        </label>
        <label> First Name:
        <input type="text" name="firstName">
        </label>
        <label> Last Name:
        <input type="text" name="lastName">
        </label>
        <button type="submit">Save</button>
    </form>
    `;
  const userForm = document.forms.userForm;
  userForm.email.value = editableUser.email;
  userForm.localId.value = editableUser.localId;

  const onHandleChange = e => {
    const { name, value } = e.target;
    user[name] = value;
    // console.log(user);
  };
  const onHandleSubmit = e => {
    e.preventDefault();
    toDataURL(userForm.avatar)
      .then(data => ({ ...user, avatar: data }))
      .then(data => editUser(id, data));
  };
  userForm.addEventListener('input', onHandleChange);
  userForm.addEventListener('submit', onHandleSubmit);
};
