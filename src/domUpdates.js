let domUpdates = {
  displayWelcomeMessage(userName, currentUser) {
    const welcomeMessage = document.querySelector('.js-welcome-message');
    const userDashboardHeader = document.querySelector('.js-user-dashboard');
    welcomeMessage.innerText = `Welcome ${userName}!`;
    userDashboardHeader.innerText = `${currentUser.name}'s Dashboard`;
  }
}

export default domUpdates;
