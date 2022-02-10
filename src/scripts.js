// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import {fetchUserData} from './apiCalls';

import UserRepository from './classes/UserRepository';
import User from './classes/User';

// query selectors
const welcomeMessage = document.querySelector('.js-welcome-message');
const dashboardText = document.querySelector('.js-user-dashboard');
const userInfo = document.querySelector('.js-user-info');
const userStepGoal = document.querySelector('.js-user-step-goal');
const avgUsersStepGoal = document.querySelector('.js-avg-users-step-goal');

// global variables
let userRepository;
let users;

// functions
function fetchData() {
  Promise.all([fetchUserData()])
    .then(data => {
      initializeUserData(data[0].userData);
      updateDashboard(1);
  });
};

function updateDashboard(id) {
  displayWelcomeMessage(id);
  displayDashboardText(id);
  displayUserInfo(id);
  displayUserStepGoal(id);
  displayAvgUsersStepGoal();
};

function initializeUserData(userData) {
  users = userData.map(user => new User(user));
  userRepository = new UserRepository(users);
}

function displayWelcomeMessage(id) {
  let user = userRepository.getUserById(id);
  let userName = user.returnFirstName();
  welcomeMessage.innerText = `Welcome ${userName}!`;
};

function displayDashboardText(id) {
  const user = userRepository.getUserById(id);
  dashboardText.innerText = `${user.name}'s Dashboard`;
};

function displayUserInfo(id) {
  const user = userRepository.getUserById(id);
  userInfo.innerHTML = `
    <p>${user.address[0]}</p>
    <p>${user.address[1]}</p>
    <p>${user.email}</p>
    <p>Stride Length: ${user.strideLength}</p>
    <p>Daily Step Goal: ${user.dailyStepGoal}</p>
  `;
};

function displayUserStepGoal(id) {
  const user = userRepository.getUserById(id);
  userStepGoal.innerText = `Your Step Goal: ${user.dailyStepGoal}`;
};

function displayAvgUsersStepGoal() {
  const avg = userRepository.getAvgUserStepGoal();
  avgUsersStepGoal.innerText = `Community Avg Step Goal: ${avg}`;
};

// function getAllFetchCalls() {
//   userData = fetchUserData()
// }

// event listeners
window.addEventListener('load', function() {
  fetchData();
});
