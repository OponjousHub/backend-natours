import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapBox';
import { updateSetting } from '/updateSettings';

// DOM ELEMENT
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const submitBtn = document.querySelector('.form-user-data');

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (submitBtn) {
  submitBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const updatedName = document.getElementById('name').value;
    const updatedEmail = document.getElementById('email').value;

    updateSetting(updatedName, updatedEmail);
  });
}
