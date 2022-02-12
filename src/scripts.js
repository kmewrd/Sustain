// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// console.log(userData,"<>>>>userData")
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

import {fetchUserData, fetchHydrationData, fetchSleepData} from './apiCalls';

import UserRepository from './classes/UserRepository';
import User from './classes/User';
import HydrationLog from './classes/HydrationLog';
import SleepLog from './classes/SleepLog';


// query selectors
const welcomeMessage = document.querySelector('.js-welcome-message');
const dashboardText = document.querySelector('.js-user-dashboard');
const userInfo = document.querySelector('.js-user-info');
const userStepGoal = document.querySelector('.js-user-step-goal');
const avgUsersStepGoal = document.querySelector('.js-avg-users-step-goal');
const todayWaterIntake = document.querySelector('.js-today-water-intake');
const weeklyWaterIntake = document.querySelector('.js-weekly-water-intake');
const recentHoursSlept = document.querySelector('.js-recent-hours-slept');
const recentSleepQuality = document.querySelector('.js-recent-sleep-quality');
const weeklyHoursSlept = document.querySelector('.js-weekly-hours-slept');
const weeklySleepQuality = document.querySelector('.js-weekly-sleep-quality');
const avgHoursSlept = document.querySelector('.js-avg-hours-slept');
const avgSleepQuality = document.querySelector('.js-avg-sleep-quality');

// global variables
let userRepository;
let users;
let hydrationLogs;
let sleepLogs;
let currentUser;

// functions
function fetchData() {
  Promise.all([fetchUserData(), fetchHydrationData(), fetchSleepData()])
    .then(data => {
      console.log(data[2]);
      initializeUserData(data[0].userData, data[1].hydrationData, data[2].sleepData);
      let randomUser = getRandomID(userRepository.users);
      getCurrentUser(randomUser);
      updateDashboard();
  });
};

function getRandomID(array) {
  let randomUserID = Math.floor(Math.random() * array.length);
  if (randomUserID) {
    return randomUserID;
  } else {
    randomUserID ++;
    return randomUserID;
  }
};

function updateDashboard() {
  displayWelcomeMessage();
  displayDashboardText();
  displayUserInfo();
  displayUserStepGoal();
  displayAvgUsersStepGoal();
  displayCurrentWaterIntake();
  displayWeeklyWaterIntake();
  displayRecentHoursSlept();
  displayRecentSleepQuality();
  displayAvgHoursSleepPerDay();
  displayAvgSleepQualityPerDay();
  displayWeeklySleepData();
};

function initializeUserData(userData, hydrationData, sleepData) {
  users = userData.map(user => new User(user));
  hydrationLogs = hydrationData.map(log => new HydrationLog(log));
  sleepLogs = sleepData.map(log => new SleepLog(log));
  userRepository = new UserRepository(users, hydrationLogs, sleepLogs);
};

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
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
};

function displayAvgUsersStepGoal() {
  const avg = userRepository.getAvgUserStepGoal();
  avgUsersStepGoal.innerText = `Community Avg Goal: ${avg} steps`;
};

function displayCurrentWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const currentWaterIntake = currentUser.getOuncesByDay(currentDate);
  todayWaterIntake.innerText = `${currentWaterIntake}`
};

function displayWeeklyWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const weeklyWater = currentUser.getOuncesByWeek(currentDate);
  weeklyWaterIntake.innerHTML = `
  <table class="weekly-water">
    <tr class="water-table-heading">
      <th></th>
      <th>Number of ounces</th>
    </tr>
    <tr>
      <td>Day 1</td>
      <td>${weeklyWater[0]} oz</td>
    </tr>
    <tr>
      <td>Day 2</td>
      <td>${weeklyWater[1]} oz</td>
    </tr>
    <tr>
      <td>Day 3</td>
      <td>${weeklyWater[2]} oz</td>
    </tr>
    <tr>
      <td>Day 4</td>
      <td>${weeklyWater[3]} oz</td>
    </tr>
    <tr>
      <td>Day 5</td>
      <td>${weeklyWater[4]} oz</td>
    </tr>
    <tr>
      <td>Day 6</td>
      <td>${weeklyWater[5]} oz</td>
    </tr>
    <tr>
      <td>Day 7</td>
      <td>${weeklyWater[6]} oz</td>
    </tr>
  </table>
  <h3>Water consumed this week</h3>
  `
};

function displayRecentHoursSlept() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightHoursSlept = currentUser.getSleepHoursByDay(currentDate);
  recentHoursSlept.innerText = `${lastNightHoursSlept}`;
};

function displayRecentSleepQuality() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightSleepQuality = currentUser.getSleepQualityByDay(currentDate);
  recentSleepQuality.innerText = `${lastNightSleepQuality}`;
};

function displayAvgHoursSleepPerDay() {
  const avgSleepHours = currentUser.getAvgHoursSleepPerDay();
  avgHoursSlept.innerText = `${avgSleepHours} average`;
};

function displayAvgSleepQualityPerDay() {
  const avgQuality = currentUser.getAvgSleepQualityPerDay();
  avgSleepQuality.innerText = `${avgQuality} average`;
};

function displayWeeklySleepData() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const weeklyHours = currentUser.getHoursSleptByWeek(currentDate);
  const weeklyQuality = currentUser.getSleepQualityByWeek(currentDate);
  weeklyHoursSlept.innerHTML = `
  <table class="weekly-sleep">
    <tr class="sleep-table-heading">
      <th></th>
      <th>Hours of Sleep</th>
      <th class="sleep-table-heading">Sleep Quality</th>
    </tr>
    <tr>
      <td>Day 1</td>
      <td>${weeklyHours[0]} hrs</td>
      <td>${weeklyQuality[0]} hrs</td>
    </tr>
    <tr>
      <td>Day 2</td>
      <td>${weeklyHours[1]} hrs</td>
      <td>${weeklyQuality[1]} hrs</td>
    </tr>
    <tr>
      <td>Day 3</td>
      <td>${weeklyHours[2]} hrs</td>
      <td>${weeklyQuality[2]} hrs</td>
    </tr>
    <tr>
      <td>Day 4</td>
      <td>${weeklyHours[3]} hrs</td>
      <td>${weeklyQuality[3]} hrs</td>
    </tr>
    <tr>
      <td>Day 5</td>
      <td>${weeklyHours[4]} hrs</td>
      <td>${weeklyQuality[4]} hrs</td>
    </tr>
    <tr>
      <td>Day 6</td>
      <td>${weeklyHours[5]} hrs</td>
      <td>${weeklyQuality[5]} hrs</td>
    </tr>
    <tr>
      <td>Day 7</td>
      <td>${weeklyHours[6]} hrs</td>
      <td>${weeklyQuality[6]} hrs</td>
    </tr>
  </table>
  <h3>Your sleep this week</h3>
  `
};

// event listeners
window.addEventListener('load', function() {
  fetchData();
});
