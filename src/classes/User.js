class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
    this.hydrationLogs;
    this.sleepLogs;
    this.activityLogs;
  }
  returnFirstName() {
    const fullName = this.name.split(" ");
    return fullName[0];
  };

  splitAddress() {
    return this.address = this.address.split(", ");
  };

  getAvgOuncesPerDay() {
    const total = this.hydrationLogs.reduce((acc, log) => {
      return acc += log.numOunces;
    }, 0);
    const avg = total / this.hydrationLogs.length;
    return avg;
  };

  getOuncesByDay(date) {
    const hydrationLog = this.hydrationLogs.find(log => {
      return log.date === date;
    });
    const ounces = hydrationLog.numOunces;
    return ounces;
  };

  getOuncesByWeek(endDate) {
    const dateIndex = this.hydrationLogs.findIndex(log => {
      return log.date === endDate;
    });
    const weekLogs = this.hydrationLogs.slice(dateIndex - 7, dateIndex);
    const weekOunces = weekLogs.map(log => {
      return log.numOunces;
    });
    return weekOunces;
  };

  getAvgHoursSleepPerDay() {
    const total = this.sleepLogs.reduce((acc, log) => {
      return acc += log.hoursSlept;
    }, 0);
    const avg = total / this.sleepLogs.length;
    return avg.toFixed(1);
  };

  getAvgSleepQualityPerDay() {
    const total = this.sleepLogs.reduce((acc, log) => {
      return acc += log.sleepQuality;
    }, 0);
    const avg = total / this.sleepLogs.length;
    return avg.toFixed(1);
  };

  getSleepHoursByDay(date) {
    const sleepLog = this.sleepLogs.find(log => {
      return log.date === date;
    });
    const hours = sleepLog.hoursSlept;
    return hours;
  };

  getSleepQualityByDay(date) {
    const sleepLog = this.sleepLogs.find(log => {
      return log.date === date;
    });
    const sleepQuality = sleepLog.sleepQuality;
    return sleepQuality;
  };

  getHoursSleptByWeek(endDate) {
    const dateIndex = this.sleepLogs.findIndex(log => {
      return log.date === endDate;
    });
    const weekLogs = this.sleepLogs.slice(dateIndex - 7, dateIndex);
    const weekHours = weekLogs.map(log => {
      return log.hoursSlept;
    });
    return weekHours;
  };

  getSleepQualityByWeek(endDate) {
    const dateIndex = this.sleepLogs.findIndex(log => {
      return log.date === endDate;
    });
    const weekLogs = this.sleepLogs.slice(dateIndex - 7, dateIndex);
    const weekQuality = weekLogs.map(log => {
      return log.sleepQuality;
    });
    return weekQuality;
  };

  getMilesByDay(date) {
    const activityLog = this.activityLogs.find(log => {
      return log.date === date;
    });
    const miles = ((this.strideLength * activityLog.numSteps) / 5280).toFixed(1);
    return miles;
  };

  getMinutesActiveByDay(date) {
    const activityLog = this.activityLogs.find(log => {
      return log.date === date;
    });
    return activityLog.minutesActive;
  };

  getAvgMinutesActiveByWeek(endDate) {
    const dateIndex = this.activityLogs.findIndex(log => {
      return log.date === endDate;
    });
    const weekLogs = this.activityLogs.slice(dateIndex - 7, dateIndex);
    const weekMinutes = weekLogs.reduce((acc, log) => {
      acc += log.minutesActive;
      return acc;
    }, 0);
    const avg = weekMinutes / weekLogs.length;
    return avg;
  };

  getStepGoalAchievement(date) {
    const activityLog = this.activityLogs.find(log => {
      return log.date === date;
    });
    return activityLog.numSteps >= this.dailyStepGoal;
  };
};

export default User;
