import User from './User';

class UserRepository {
  constructor(data) {
    this.users = data;
  }
  getAvgUserStepGoal() {
    const total = this.users.reduce((acc, user) => {
      return acc += user.dailyStepGoal;
    }, 0);
    const avg = total / this.users.length;
    return avg;
  }
}

export default UserRepository;
