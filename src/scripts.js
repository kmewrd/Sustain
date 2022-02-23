import './css/styles.css';
import './images/activity-icon.png';
import './images/hydration-icon.png';
import './images/sleep-icon.png';
import {fetchData} from './apiCalls';
import UserRepository from './classes/UserRepository';
import User from './classes/User';
import HydrationLog from './classes/HydrationLog';
import SleepLog from './classes/SleepLog';
import domUpdates from './domUpdates.js';

// query selectors




const todayWaterIntake = document.querySelector('.js-today-water-intake');
const weeklyWaterIntake = document.querySelector('.js-weekly-water-intake');
const recentHoursSlept = document.querySelector('.js-recent-hours-slept');
const recentSleepQuality = document.querySelector('.js-recent-sleep-quality');
const weeklySleepTables = document.querySelector('.js-weekly-sleep-tables');
const avgHoursSlept = document.querySelector('.js-avg-hours-slept');
const avgSleepQuality = document.querySelector('.js-avg-sleep-quality');

// global variables
let userRepository;
let users;
let hydrationLogs;
let sleepLogs;
let currentUser;

// functions
function fetchAllData() {
  Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep')])
    .then(data => {
      initializeUserData(data[0].userData, data[1].hydrationData, data[2].sleepData);
      let randomUser = getRandomID(userRepository.users);
      getCurrentUser(randomUser);
      updateDashboard(currentUser);
  });
};

function getRandomID(array) {
  let randomUserID = Math.floor(Math.random() * array.length);
  if (randomUserID) {
    return randomUserID;
  } else {
    randomUserID ++;
    return randomUserID;
  };
};

function updateDashboard(currentUser) {
  welcomeUser(currentUser);
  updateUserInfo(currentUser);
  domUpdates.displayUserStepGoal(currentUser);
  domUpdates.displayAvgUsersStepGoal();
  displayDailyStats();
  displayWeeklyStats();
};

function displayDailyStats() {
  displayCurrentWaterIntake();
  displayAvgSleepQualityPerDay();
  displayAvgHoursSleepPerDay();
  displayRecentSleepQuality();
  displayRecentHoursSlept();
};

function displayWeeklyStats() {
  displayWeeklyWaterIntake();
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

function welcomeUser() {
  let userName = currentUser.returnFirstName();
  domUpdates.displayWelcomeMessage(userName, currentUser);
};

function updateUserInfo(currentUser) {
  currentUser.splitAddress();
  domUpdates.displayUserInfo(currentUser);
};


function updateAvgUsersStepGoal() {
  const avg = userRepository.getAvgUserStepGoal();
  displayAvgUsersStepGoal(avg);

};

function displayCurrentWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const currentWaterIntake = currentUser.getOuncesByDay(currentDate);
  todayWaterIntake.innerText = `${currentWaterIntake}`;
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
  <h4>Water consumed this week</h4>
  `;
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
  weeklySleepTables.innerHTML = `
  <table class="weekly-sleep">
    <tr class="sleep-table-heading">
      <th></th>
      <th>Hours of Sleep</th>
      <th class="sleep-table-heading">Sleep Quality</th>
    </tr>
    <tr>
      <td>Day 1</td>
      <td>${weeklyHours[0]} hrs</td>
      <td>${weeklyQuality[0]}</td>
    </tr>
    <tr>
      <td>Day 2</td>
      <td>${weeklyHours[1]} hrs</td>
      <td>${weeklyQuality[1]}</td>
    </tr>
    <tr>
      <td>Day 3</td>
      <td>${weeklyHours[2]} hrs</td>
      <td>${weeklyQuality[2]}</td>
    </tr>
    <tr>
      <td>Day 4</td>
      <td>${weeklyHours[3]} hrs</td>
      <td>${weeklyQuality[3]}</td>
    </tr>
    <tr>
      <td>Day 5</td>
      <td>${weeklyHours[4]} hrs</td>
      <td>${weeklyQuality[4]}</td>
    </tr>
    <tr>
      <td>Day 6</td>
      <td>${weeklyHours[5]} hrs</td>
      <td>${weeklyQuality[5]}</td>
    </tr>
    <tr>
      <td>Day 7</td>
      <td>${weeklyHours[6]} hrs</td>
      <td>${weeklyQuality[6]}</td>
    </tr>
  </table>
  <h4>Your sleep this week</h4>
  `;
};

// event listeners
window.addEventListener('load', function() {
  fetchAllData();
});
