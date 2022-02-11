// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import {fetchUserData, fetchHydrationData} from './apiCalls';

import UserRepository from './classes/UserRepository';
import User from './classes/User';
import HydrationLog from './classes/HydrationLog';


// query selectors
const welcomeMessage = document.querySelector('.js-welcome-message');
const dashboardText = document.querySelector('.js-user-dashboard');
const userInfo = document.querySelector('.js-user-info');
const userStepGoal = document.querySelector('.js-user-step-goal');
const avgUsersStepGoal = document.querySelector('.js-avg-users-step-goal');
const todayWaterIntake = document.querySelector('.js-today-water-intake');
const weeklyWaterIntake = document.querySelector('.js-weekly-water-intake');

// global variables
let userRepository;
let users;
let hydrationLogs;
let currentUser;

// functions
function fetchData() {
  Promise.all([fetchUserData(), fetchHydrationData()])
    .then(data => {
      initializeUserData(data[0].userData, data[1].hydrationData);
      getCurrentUser(1);
      updateDashboard();
  });
};

function updateDashboard() {
  displayWelcomeMessage();
  displayDashboardText();
  displayUserInfo();
  displayUserStepGoal();
  displayAvgUsersStepGoal();
  displayCurrentWaterIntake();
  displayWeeklyWaterIntake();
};

function initializeUserData(userData, hydrationData) {
  users = userData.map(user => new User(user));
  hydrationLogs = hydrationData.map(log => new HydrationLog(log));
  userRepository = new UserRepository(users, hydrationLogs);
}

function getCurrentUser(id) {
  currentUser = userRepository.getUserById(id);
};

function displayWelcomeMessage() {
  let userName = currentUser.returnFirstName();
  welcomeMessage.innerText = `Welcome ${userName}!`;
};

function displayDashboardText() {
  dashboardText.innerText = `${currentUser.name}'s Dashboard`;
};

function displayUserInfo() {
  userInfo.innerHTML = `
    <p>${currentUser.address[0]}</p>
    <p>${currentUser.address[1]}</p>
    <p>${currentUser.email}</p>
    <p>Stride Length: ${currentUser.strideLength}</p>
    <p>Daily Step Goal: ${currentUser.dailyStepGoal}</p>
  `;
};

function displayUserStepGoal() {
  userStepGoal.innerText = `Your Step Goal: ${currentUser.dailyStepGoal}`;
};

function displayAvgUsersStepGoal() {
  const avg = userRepository.getAvgUserStepGoal();
  avgUsersStepGoal.innerText = `Community Avg Step Goal: ${avg}`;
};

function displayCurrentWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const currentWaterIntake = currentUser.getOuncesByDay(currentDate);
  todayWaterIntake.innerText = `Today's water intake: ${currentWaterIntake} ounces`
};

function displayWeeklyWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const weeklyWater = currentUser.getOuncesByWeek(currentDate);
  weeklyWaterIntake.innerHTML = `
  <h3>Your Past Week</h3>
  <p>Day 1: ${weeklyWater[0]} ounces</p>
  <p>Day 2: ${weeklyWater[1]} ounces</p>
  <p>Day 3: ${weeklyWater[2]} ounces</p>
  <p>Day 4: ${weeklyWater[3]} ounces</p>
  <p>Day 5: ${weeklyWater[4]} ounces</p>
  <p>Day 6: ${weeklyWater[5]} ounces</p>
  <p>Day 7: ${weeklyWater[6]} ounces</p>
  `
};
// function getAllFetchCalls() {
//   userData = fetchUserData()
// }

// event listeners
window.addEventListener('load', function() {
  fetchData();
});
