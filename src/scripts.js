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







const weeklySleepTables = document.querySelector('.js-weekly-sleep-tables');



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
  };
};

function updateDashboard() {
  welcomeUser(currentUser);
  updateUserInfo(currentUser);
  domUpdates.displayUserStepGoal(currentUser);
  domUpdates.displayAvgUsersStepGoal();
  displayDailyStats();
  displayWeeklyStats();
};

function displayDailyStats() {
  updateCurrentWaterIntake(currentUser);
  updateAvgSleepQualityPerDay();
  updateAvgHoursSleepPerDay();
  updateRecentSleepQuality();
  updateRecentHoursSlept();
};

function displayWeeklyStats() {
  updateWeeklyWaterIntake();
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

function updateCurrentWaterIntake(currentUser) {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const currentWaterIntake = currentUser.getOuncesByDay(currentDate);
  domUpdates.displayCurrentWaterIntake(currentUser, currentWaterIntake);
};

function updateWeeklyWaterIntake() {
  const currentDate = currentUser.hydrationLogs[(currentUser.hydrationLogs.length -1)].date;
  const weeklyWater = currentUser.getOuncesByWeek(currentDate);
  domUpdates.displayWeeklyWaterIntake(weeklyWater);
};

function updateRecentHoursSlept() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightHoursSlept = currentUser.getSleepHoursByDay(currentDate);
  domUpdates.displayRecentHoursSlept(lastNightHoursSlept);
};

function updateRecentSleepQuality() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const lastNightSleepQuality = currentUser.getSleepQualityByDay(currentDate);
 domUpdates.displayRecentSleepQuality(lastNightSleepQuality);
};

function updateAvgHoursSleepPerDay() {
  const avgSleepHours = currentUser.getAvgHoursSleepPerDay();
  domUpdates.displayAvgHoursSleepPerDay(avgSleepHours);
};

function updateAvgSleepQualityPerDay() {
  const avgQuality = currentUser.getAvgSleepQualityPerDay();
  domUpdates.displayAvgSleepQualityPerDay(avgQuality)
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
