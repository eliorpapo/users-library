import axios from 'axios';
import { storageService } from './storageService.js';
import { makeId } from './utilService.js';

export const userService = {
  query,
  save,
  remove,
  getById,
  getEmptyUser,
  isMailExist,
};

const STORAGE_KEY = 'users';

var gUsers = [];

async function query(filterBy) {
  gUsers = await _loadUsers();
  let usersToReturn = gUsers;
  if (filterBy) {
    var { firstName, lastName, email, country, id } = filterBy;
    usersToReturn = gUsers.filter(
      (user) =>
        user.name.first.toLowerCase().includes(firstName.toLowerCase()) &&
        user.name.last.toLowerCase().includes(lastName.toLowerCase()) &&
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        user.location.country.toLowerCase().includes(country.toLowerCase()) &&
        user._id.includes(id)
    );
  }
  if (!usersToReturn) return;
  return Promise.resolve([...usersToReturn]);
}
function getById(id) {
  const user = gUsers.find((user) => user._id === id);
  return Promise.resolve({ ...user });
}

function remove(id) {
  const idx = gUsers.findIndex((user) => user._id === id);
  gUsers.splice(idx, 1);
  storageService.store(STORAGE_KEY, gUsers);
  return Promise.resolve();
}

function save(userToSave) {
  if (userToSave._id) {
    const idx = gUsers.findIndex((user) => user._id === userToSave._id);
    gUsers.splice(idx, 1, userToSave);
  } else {
    userToSave._id = makeId();
    gUsers.push(userToSave);
  }
  storageService.store(STORAGE_KEY, gUsers);
  return Promise.resolve(userToSave);
}

function getEmptyUser() {
  return {
    name: { title: '', first: '', last: '' },
    _id: '',
    email: '',
    userImage: '',
    location: {
      country: '',
      city: '',
      street: {
        number: 0,
        name: '',
      },
    },
  };
}

async function _loadUsers() {
  let users = storageService.load(STORAGE_KEY);
  if (!users || !users.length) {
    var res = await axios.get(`https://randomuser.me/api/?results=11`);
    users = res.data.results;
    users.forEach((user) => {
      user.userImage = user.picture.medium;
      user._id = user.login.uuid;
    });
    storageService.store(STORAGE_KEY, users);
    gUsers = [...users];
  }
  return [...users];
}

function isMailExist(email, id) {
  const users = gUsers.filter(
    (user) => user.email === email && user._id !== id
  );
  if (users.length) return false;
  return true;
}
