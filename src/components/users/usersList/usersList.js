import { refs } from '../../../refs/refs';
import { state } from '../../../data/data';
import { deleteUserByID } from '../../../api/api';
import { createUserForm } from '../usersForm/usersForm';

const createUsersMarkup = () => {
  return state.data.users.reduce((acc, user) => {
    acc += `
        <li data-id="${user.id}">
        <img src=${user.avatar ? user.avatar : ''} alt="" />
        <h2>Email: ${user.email}</h2>
        <p>ID: ${user.localId}</p>
        <button type="button" data-btn="edit">Edit</button>
        <button type="button" data-btn="delete">Delete</button>

        </li>`;
    return acc;
  }, '');
};
export const createUsersList = () => {
  refs.content.innerHTML = `
  <div class="flexible">
    <ul class="usersList">${createUsersMarkup()}</ul>
    <div class="usersDataContent"></div>
  </div>
`;
  const usersList = document.querySelector('.usersList');
  const options = e => {
    // console.log(e.target);
    if (e.target.dataset) {
      if (e.target.dataset.btn === 'edit') {
        const id = e.target.closest('[data-id]').dataset.id;
        console.log('edit');
        createUserForm(id);
      } else if (e.target.dataset.btn === 'delete') {
        console.log('delete');
        const id = e.target.closest('[data-id]').dataset.id;
        deleteUserByID(id);
      } else return;
    } else return;
  };
  usersList.addEventListener('click', options);
};
