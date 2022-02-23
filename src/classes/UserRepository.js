class UserRepository {
  constructor(userData, hydrationData, sleepData, activityData) {
    this.users = userData;
    this.hydrationLogs = hydrationData;
    this.sleepLogs = sleepData;
    this.activityLogs = activityData;
  };

  getUserById(id) {
    const user = this.users.find(person => {
      return person.id === id;
    });
    user.hydrationLogs = this.getUserLogs(this.hydrationLogs, id);
    user.sleepLogs = this.getUserLogs(this.sleepLogs, id);
    return user;
  };

  getAvgUserStepGoal() {
    const total = this.users.reduce((acc, user) => {
      return acc += user.dailyStepGoal;
    }, 0);
    const avg = total / this.users.length;
    return avg;
  };

  getUserLogs(dataLogs, id) {
    const userLogs = dataLogs.filter(log => {
      return log.userID === id;
    });
    return userLogs;
  };

  getAvgUserSleepQuality() {
    const total = this.sleepLogs.reduce((acc, log) => {
      return acc += log.sleepQuality;
    }, 0);
    const avg = total / this.users.length;
    return avg;
  };

  getAvgUserFlightsClimbed(date) {
    const allLogsByDate = this.activityLogs.filter(log => {
      return log.date === date;
    });
    const total = allLogsByDate.reduce((acc, log) => {
      acc += log.flightsOfStairs;
      return acc;
    }, 0);
    const avg = total / allLogsByDate.length;
    return avg.toFixed(1);
  };

  getAvgUserNumSteps(date) {
    const allLogsByDate = this.activityLogs.filter(log => {
      return log.date === date;
    });
    const total = allLogsByDate.reduce((acc, log) => {
      acc += log.numSteps;
      return acc;
    }, 0);
    const avg = total / allLogsByDate.length;
    return avg.toFixed(1);
  };

  getAvgUserMinutesActive(date) {
    const allLogsByDate = this.activityLogs.filter(log => {
      return log.date === date;
    });
    const total = allLogsByDate.reduce((acc, log) => {
      acc += log.minutesActive;
      return acc;
    }, 0);
    const avg = total / allLogsByDate.length;
    return avg.toFixed(1);
  };
};

export default UserRepository;
