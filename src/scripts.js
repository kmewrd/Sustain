// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import userData from './data/users';

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

// event listeners

// functions
function updateDashboard() {
  // call functions that update welcomeMessage, dashboardText, userInfo, userStepGoal, and avgUsersStepGoal
};

function initializeUserData(userData) {
  users = userData.map(user => new User(user));
  userRepository = new UserRepository(users);
};

function displayWelcomeMessage(id) {
  const user = userRepository.users.find(user => {
    return user.id === id;
  });
  const userName = user.returnFirstName();
  welcomeMessage.innerText = `Welcome ${userName}!`;
};
