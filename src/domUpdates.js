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
  }
}

export default domUpdates;
