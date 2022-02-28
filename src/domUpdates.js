let domUpdates = {
  displayWelcomeMessage(userName, currentUser) {
    const welcomeMessage = document.querySelector('.js-welcome-message');
    const userDashboardHeader = document.querySelector('.js-user-dashboard');
    welcomeMessage.innerText = `Welcome ${userName}!`;
    userDashboardHeader.innerText = `${currentUser.name}'s Dashboard`;
  },
  displayUserInfo(currentUser) {
    const userInfo = document.querySelector('.js-user-info');
    userInfo.innerHTML = `
      <p class="address-line1">${currentUser.addressLineOne}</p>
      <p class="address-line2">${currentUser.addressLineTwo}</p>
      <p>${currentUser.email}</p>
      <p>Stride Length: ${currentUser.strideLength}</p>
      <p>Daily Step Goal: ${currentUser.dailyStepGoal}</p>
    `;
  },
  displayAvgUsersStepGoal(avg) {
    const avgUsersStepGoal = document.querySelector('.js-avg-users-step-goal');
    avgUsersStepGoal.innerText = `Community Avg Goal: ${avg} steps`;
  },
  displayCurrentWaterIntake(currentUser, currentWaterIntake) {
    const todayWaterIntake = document.querySelector('.js-today-water-intake');
    todayWaterIntake.innerText = `${currentWaterIntake}`;
  },
  displayWeeklyWaterIntake(weeklyWater) {
    const weeklyWaterIntake = document.querySelector('.js-weekly-water-intake');
    weeklyWaterIntake.innerHTML = `
    <table class="weekly-water">
      <tr class="water-table-heading">
        <td></td>
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
    <h3 class="text-under-table">Water consumed this week</h3>
    `;
  },
  displayRecentHoursSlept(lastNightHoursSlept) {
    const recentHoursSlept = document.querySelector('.js-recent-hours-slept');
    recentHoursSlept.innerText = `${lastNightHoursSlept}`;
  },
  displayRecentSleepQuality(lastNightSleepQuality) {
    const recentSleepQuality = document.querySelector('.js-recent-sleep-quality');
    recentSleepQuality.innerText = `${lastNightSleepQuality}`;
  },
  displayAvgHoursSleepPerDay(avgSleepHours) {
    const avgHoursSlept = document.querySelector('.js-avg-hours-slept');
    avgHoursSlept.innerText = `${avgSleepHours} average`;
  },
  displayAvgSleepQualityPerDay(avgQuality) {
    const avgSleepQuality = document.querySelector('.js-avg-sleep-quality');
    avgSleepQuality.innerText = `${avgQuality} average`;
  },
  displayWeeklySleepData(weeklyHours, weeklyQuality) {
    const weeklySleepTables = document.querySelector('.js-weekly-sleep-tables');
    weeklySleepTables.innerHTML = `
    <table class="weekly-sleep">
      <tr class="sleep-table-heading">
        <td></td>
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
    <h3 class="text-under-table">Your sleep this week</h3>
    `;
  },

  displayRecentStepsTaken(todaySteps) {
   const recentSteps = document.querySelector(`.js-recent-steps-taken`);
   recentSteps.innerText = todaySteps;
  },

  displayRecentMinutesActive(todayMin) {
    const recentActive = document.querySelector('.js-minutes-active');
    recentActive.innerText = todayMin;
  },

  displayRecentMilesWalked(todayMiles) {
    const recentMiles = document.querySelector('.js-miles-walked');
    recentMiles.innerText = todayMiles;
  },

  displayRecentFlightsClimbed(flights) {
    const recentFlights = document.querySelector('.js-flights-climbed');
    recentFlights.innerText = flights;
  },

  displayAllUsersTodaySteps(steps) {
    const avgSteps = document.querySelector('.js-avg-steps-taken')
    avgSteps.innerText = `${steps} average`
  },

  displayAllUsersTodayMinutes(min) {
    const avgMin = document.querySelector('.js-avg-minutes-active')
    avgMin.innerText = `${min} average`;
  },

  displayAllUsersTodayFlights(flights) {
    const avgFlights = document.querySelector('.js-avg-flights-climbed');
    avgFlights.innerText = `${flights} average`
  },
  displayAllUsersTodayMiles(miles) {
    const avgMiles = document.querySelector('.js-avg-miles-walked');
    avgMiles.innerText = `${miles} average`;
  },

  displayWeeklyActivity(flights, steps, min) {
    const weeklyActivityTables = document.querySelector('.js-weekly-activity-tables');
    weeklyActivityTables.innerHTML = `
    <table class="weekly-activity">
      <tr class="activity-table-heading">
        <td></td>
        <th>Flights of Stairs</th>
        <th class="activity-table-heading">Step Count</th>
        <th class="activity-table-heading">Minutes Active</th>
      </tr>
      <tr>
        <td>Day 1</td>
        <td>${flights[0]} flights</td>
        <td>${steps[0]} steps</td>
        <td>${min[0]} min</td>
      </tr>
      <tr>
        <td>Day 2</td>
        <td>${flights[1]} flights</td>
        <td>${steps[1]} steps</td>
        <td>${min[1]} min</td>
      </tr>
      <tr>
        <td>Day 3</td>
        <td>${flights[2]} flights</td>
        <td>${steps[2]} steps</td>
        <td>${min[2]} min</td>
      </tr>
      <tr>
        <td>Day 4</td>
        <td>${flights[3]} flights</td>
        <td>${steps[3]} steps</td>
        <td>${min[3]} min</td>
      </tr>
      <tr>
        <td>Day 5</td>
        <td>${flights[4]} flights</td>
        <td>${steps[4]} steps</td>
        <td>${min[4]} min</td>
      </tr>
      <tr>
        <td>Day 6</td>
        <td>${flights[5]} flights</td>
        <td>${steps[5]} steps</td>
        <td>${min[5]} min</td>
      </tr>
      <tr>
        <td>Day 7</td>
        <td>${flights[6]} flights</td>
        <td>${steps[6]} steps</td>
        <td>${min[6]} min</td>
      </tr>
    </table>
    <h3 class="text-under-table">Your activity this week</h3>
    `;
  }
}

export default domUpdates;
