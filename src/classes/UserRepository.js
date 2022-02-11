import User from './User';

class UserRepository {
  constructor(userData, hydrationData) {
    this.users = userData;
    this.hydrationLogs = hydrationData;
  }
  getUserById(id) {
    const user = this.users.find(person => {
      return person.id === id;
    });
    user.hydrationLogs = this.getUserLogs(this.hydrationLogs, id)
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
}

export default UserRepository;
