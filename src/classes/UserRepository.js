class UserRepository {
  constructor(userData, hydrationData, sleepData) {
    this.users = userData;
    this.hydrationLogs = hydrationData;
    this.sleepLogs = sleepData;
  }
  getUserById(id) {
    const user = this.users.find(person => {
      return person.id === id;
    });
    user.hydrationLogs = this.getUserLogs(this.hydrationLogs, id);
    user.sleepLogs = this.getUserLogs(this.sleepLogs, id);
    return user;
  }
  getAvgUserStepGoal() {
    const total = this.users.reduce((acc, user) => {
      return acc += user.dailyStepGoal;
    }, 0);
    const avg = total / this.users.length;
    return avg;
  }
  getUserLogs(dataLogs, id) {
    const userLogs = dataLogs.filter(log => {
      return log.userID === id;
    });
    return userLogs;
  }
  getAvgUserSleepQuality() {
    const total = this.sleepLogs.reduce((acc, log) => {
      return acc += log.sleepQuality;
    }, 0);
    const avg = total / this.users.length;
    return avg;
  }
}

export default UserRepository;
