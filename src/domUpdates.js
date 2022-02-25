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
      <p class="address-line1">${currentUser.address[0]}</p>
      <p class="address-line2">${currentUser.address[1]}</p>
      <p>${currentUser.email}</p>
      <p>Stride Length: ${currentUser.strideLength}</p>
      <p>Daily Step Goal: ${currentUser.dailyStepGoal}</p>
    `;
  },
  displayUserStepGoal(currentUser) {
    const userStepGoal = document.querySelector('.js-user-step-goal');
    userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
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
  }
}

export default domUpdates;
