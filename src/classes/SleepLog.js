class SleepLog {
  constructor(data){
    this.userID = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
  }
  getAvgHoursSleepPerDay() {
    const total = this.sleepLogs.reduce((acc, log) => {
      return acc += log.hoursSlept;
    }, 0);
    const avg = total / this.sleepLogs.length;
    return avg;
  };
}

export default SleepLog;
