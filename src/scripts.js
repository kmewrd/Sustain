import './css/styles.css';
import './images/activity-icon.png';
import './images/hydration-icon.png';
import './images/sleep-icon.png';
import {fetchData, postData} from './apiCalls';
import UserRepository from './classes/UserRepository';
import User from './classes/User';
import HydrationLog from './classes/HydrationLog';
import SleepLog from './classes/SleepLog';
import ActivityLog from './classes/ActivityLog';
import domUpdates from './domUpdates';
import helperFunctions from './utilities';

// global variables
let userRepository;
let users;
let hydrationLogs;
let sleepLogs;
let activityLogs;
let currentUser;

//query selectors
const select = document.querySelector('.js-tracker-options');
const inputFields = document.querySelector('.js-input-fields');
const newSteps = document.querySelector('.js-new-steps');
const newMinutesActive = document.querySelector('.js-new-minutes-active');
const newFlightsClimbed = document.querySelector('.js-new-flights');
const newOuncesDrank = document.querySelector('.js-new-hydration');
const newHoursSlept = document.querySelector('.js-new-hours-slept');
const newSleepQuality = document.querySelector('.js-new-sleep-quality');
const submitButton = document.querySelector('.js-submit');

// functions
function fetchAllData() {
  Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')])
    .then(data => {
      initializeUserData(data[0].userData, data[1].hydrationData, data[2].sleepData, data[3].activityData);
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
  updateAvgUsersStepGoal();
  updateDailyStats();
  updateWeeklyStats();

};

function updateDailyStats() {
  updateCurrentWaterIntake(currentUser);
  updateAvgSleepQualityPerDay();
  updateAvgHoursSleepPerDay();
  updateRecentSleepQuality();
  updateRecentHoursSlept();
  updateTodaySteps();
  updateTodayMinutesActive();
  updateTodayMilesWalked();
  updateTodayFlightsClimbed();
  updateAllUsersTodaySteps();
  updateAllUsersMinutesActive();
  updateAllUsersFlightsClimbed();
  updateAllUsersMilesWalked();
};

function updateWeeklyStats() {
  updateWeeklyWaterIntake();
  updateWeeklySleepData();
  updateWeeklyActivity();
};

function initializeUserData(userData, hydrationData, sleepData, activityData) {
  users = userData.map(user => new User(user));
  hydrationLogs = hydrationData.map(log => new HydrationLog(log));
  sleepLogs = sleepData.map(log => new SleepLog(log));
  activityLogs = activityData.map(log => new ActivityLog(log));
  userRepository = new UserRepository(users, hydrationLogs, sleepLogs, activityLogs);
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
  domUpdates.displayAvgUsersStepGoal(avg);

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

function updateWeeklySleepData() {
  const currentDate = currentUser.sleepLogs[(currentUser.sleepLogs.length -1)].date;
  const weeklyHours = currentUser.getHoursSleptByWeek(currentDate);
  const weeklyQuality = currentUser.getSleepQualityByWeek(currentDate);
  domUpdates.displayWeeklySleepData(weeklyHours, weeklyQuality);
};

function updateTodaySteps() {
  const sortByDate = currentUser.activityLogs.sort((a, b) => {
    let aa = a.date.split('/').reverse().join();
    let bb = b.date.split('/').reverse().join();

    if (bb < aa) {
      return -1
    } else if (aa > bb) {
      return 1;
    } else {
      return 0;
    }
  });
  const sortByYear = sortByDate.sort((a, b) => {
    let aa = a.date;
    let bb = b.date;

    if (bb < aa) {
      return -1
    } else if (aa > bb) {
      return 1;
    } else {
      return 0;
    }
  });
  const todaySteps = sortByDate[0].numSteps;
  domUpdates.displayRecentStepsTaken(todaySteps)
};

function updateTodayMinutesActive() {
  const todayLog = currentUser.activityLogs[(currentUser.activityLogs.length -1)];
  const minActive = todayLog.minutesActive;
  domUpdates.displayRecentMinutesActive(minActive);
};

function updateTodayMilesWalked() {
  const todayLog = currentUser.activityLogs[(currentUser.activityLogs.length -1)];
  const miles = ((currentUser.strideLength * todayLog.numSteps) / 5280).toFixed(1);
  domUpdates.displayRecentMilesWalked(miles);
};

function updateTodayFlightsClimbed() {
  const todayLog = currentUser.activityLogs[(currentUser.activityLogs.length -1)];
  const flights = todayLog.flightsOfStairs;
  domUpdates.displayRecentFlightsClimbed(flights);
};


function updateAllUsersTodaySteps() {
  const currentDate = currentUser.activityLogs[(currentUser.activityLogs.length -1)].date;
  const avgTodaySteps = userRepository.getAvgUserNumSteps(currentDate);
  domUpdates.displayAllUsersTodaySteps(avgTodaySteps)
};

function updateAllUsersMinutesActive() {
  const currentDate = currentUser.activityLogs[(currentUser.activityLogs.length -1)].date;
  const avgMinutesActive = userRepository.getAvgUserMinutesActive(currentDate);
  domUpdates.displayAllUsersTodayMinutes(avgMinutesActive);
};

function updateAllUsersFlightsClimbed() {
  const currentDate = currentUser.activityLogs[(currentUser.activityLogs.length -1)].date;
  const avgFlightsClimbed = userRepository.getAvgUserFlightsClimbed(currentDate);
  domUpdates.displayAllUsersTodayFlights(avgFlightsClimbed);
};

function updateAllUsersMilesWalked() {
  const currentDate = currentUser.activityLogs[(currentUser.activityLogs.length -1)].date;
  const avgMilesWalked = userRepository.getAvgUserMilesWalked(currentDate)
  domUpdates.displayAllUsersTodayMiles(avgMilesWalked)
};

function updateWeeklyActivity() {
  const currentDate = currentUser.activityLogs[(currentUser.activityLogs.length - 1)].date;
  const weeklyFlights = currentUser.getActivityByWeek(currentDate, 'flightsOfStairs');
  const weeklySteps = currentUser.getActivityByWeek(currentDate, 'numSteps');
  const weeklyMin = currentUser.getActivityByWeek(currentDate, 'minutesActive')
  domUpdates.displayWeeklyActivity(weeklyFlights, weeklySteps, weeklyMin)
}

function show(inputs) {
  inputs.forEach(input => {
    input.classList.remove('hidden');
    input.setAttribute('required', '');
  });
};

function hide(inputs) {
  inputs.forEach(input => {
    input.classList.add('hidden');
    input.removeAttribute('required', '')
  });
};

function selectForm(event) {
  if(event.target.value === 'Activity') {
    show([inputFields, newSteps, newMinutesActive, newFlightsClimbed, submitButton]);
    hide([newOuncesDrank, newHoursSlept, newSleepQuality ]);
  } else if
    (event.target.value === 'Hydration') {
      show([inputFields, newOuncesDrank, submitButton]);
      hide([newSteps, newMinutesActive, newFlightsClimbed, newHoursSlept, newSleepQuality]);
    } else if
    (event.target.value === 'Sleep') {
      show([inputFields, newHoursSlept, newSleepQuality, submitButton]);
      hide([newSteps, newMinutesActive, newFlightsClimbed, newOuncesDrank]);
    }
};

function submitNewActivityData() {
  const todayDate = helperFunctions.reformatDate();
  const newActivityData = {
    userID: currentUser.id,
    date: todayDate,
    flightsOfStairs: newFlightsClimbed.value,
    minutesActive: newMinutesActive.value,
    numSteps: newSteps.value
  };
  console.log(newActivityData)
  postData(newActivityData, 'activity');
};

function submitNewHydrationData() {
  const todayDate = helperFunctions.reformatDate();
  const newHydrationData = {
    userID: currentUser.id,
    date: todayDate,
    numOunces: newOuncesDrank.value
  };
  console.log(newHydrationData)
  postData(newHydrationData, 'hydration');
};

function submitNewSleepData() {
  const todayDate = helperFunctions.reformatDate();
  const newSleepData = {
    userID: currentUser.id,
    date: todayDate,
    hoursSlept: newHoursSlept.value,
    sleepQuality: newSleepQuality.value
  };
  console.log(newSleepData)
  postData(newSleepData, 'sleep');
};

function submitData() {
  if(newFlightsClimbed.value) {
    submitNewActivityData()
  } else if
    (newOuncesDrank.value) {

    submitNewHydrationData()
    } else if
    (newHoursSlept.value) {
    submitNewSleepData()
    }
}

// event listeners
window.addEventListener('load', function() {
  fetchAllData();
});

select.addEventListener('change', function(event) {
  selectForm(event)
});

submitButton.addEventListener('click', submitData);
