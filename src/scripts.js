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
      let randomUser = getRandomIndex(userRepository.users);
      getCurrentUser(randomUser);
      updateDashboard();
  });
};

function getRandomIndex(array) {
  let userIndex = Math.floor(Math.random() * array.length);
  if (userIndex) {
    return userIndex;
  } else {
    userIndex ++;
    return userIndex;
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
  <h3>Your Past Week of Hydration</h3>
  <p>Day 1: ${weeklyWater[0]} ounces</p>
  <p>Day 2: ${weeklyWater[1]} ounces</p>
  <p>Day 3: ${weeklyWater[2]} ounces</p>
  <p>Day 4: ${weeklyWater[3]} ounces</p>
  <p>Day 5: ${weeklyWater[4]} ounces</p>
  <p>Day 6: ${weeklyWater[5]} ounces</p>
  <p>Day 7: ${weeklyWater[6]} ounces</p>
  `
};

function displayRecentHoursSlept() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightHoursSlept = currentUser.getSleepHoursByDay(currentDate);
  recentHoursSlept.innerText = `Hours Slept Last Night: ${lastNightHoursSlept} hours`;
};

function displayRecentSleepQuality() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightSleepQuality = currentUser.getSleepQualityByDay(currentDate);
  recentSleepQuality.innerText = `Sleep Quality Last Night: ${lastNightSleepQuality}`;
};

function displayAvgHoursSleepPerDay() {
  const avgSleepHours = currentUser.getAvgHoursSleepPerDay();
  avgHoursSlept.innerText = `Your Average Hours of Sleep: ${avgSleepHours} hours`;
};

function displayAvgSleepQualityPerDay() {
  const avgQuality = currentUser.getAvgSleepQualityPerDay();
  avgSleepQuality.innerText = `Your Average Sleep Quality: ${avgQuality}`;
};

function displayWeeklySleepData() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const weeklyHours = currentUser.getHoursSleptByWeek(currentDate);
  const weeklyQuality = currentUser.getSleepQualityByWeek(currentDate);
  weeklyHoursSlept.innerHTML = `
  <h3>Your Past Week of Sleep</h3>
  <table>
    <tr>
      <th></th>
      <th>Hours of Sleep</th>
      <th>Sleep Quality</th>
    </tr>
    <tr>
      <td>Day 1</td>
      <td>${weeklyHours[0]}</td>
      <td>${weeklyQuality[0]}</td>
    </tr>
    <tr>
      <td>Day 2</td>
      <td>${weeklyHours[1]}</td>
      <td>${weeklyQuality[1]}</td>
    </tr>
    <tr>
      <td>Day 3</td>
      <td>${weeklyHours[2]}</td>
      <td>${weeklyQuality[2]}</td>
    </tr>
    <tr>
      <td>Day 4</td>
      <td>${weeklyHours[3]}</td>
      <td>${weeklyQuality[3]}</td>
    </tr>
    <tr>
      <td>Day 5</td>
      <td>${weeklyHours[4]}</td>
      <td>${weeklyQuality[4]}</td>
    </tr>
    <tr>
      <td>Day 6</td>
      <td>${weeklyHours[5]}</td>
      <td>${weeklyQuality[5]}</td>
    </tr>
    <tr>
      <td>Day 7</td>
      <td>${weeklyHours[6]}</td>
      <td>${weeklyQuality[6]}</td>
    </tr>
  </table>
  `
};

// event listeners
window.addEventListener('load', function() {
  fetchData();
});
