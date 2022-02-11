class User {
  constructor(userData) {
    this.id = userData.id;
		this.name = userData.name;
		this.address = userData.address.split(", ");
		this.email = userData.email;
		this.strideLength = userData.strideLength;
		this.dailyStepGoal = userData.dailyStepGoal;
		this.friends = userData.friends;
  }
  returnFirstName() {
		const fullName = this.name.split(" ");
    return fullName[0];
	}
  getAvgOuncesPerDay() {
    const total = this.hydrationLogs.reduce((acc, log) => {
      return acc += log.numOunces;
    }, 0);
    const avg = total / this.hydrationLogs.length;
    return avg;
  }
  getOuncesByDay(date) {
    const hydrationLog = this.hydrationLogs.find(log => {
      return log.date === date;
    });
    const ounces = hydrationLog.numOunces;
    return ounces;
  }
  getOuncesByWeek(startDate) {
    const dateIndex = this.hydrationLogs.findIndex(log => {
      return log.date === startDate
    });
    const week = this.hydrationLogs.slice(dateIndex, dateIndex + 7)
    return week;
  }
}
//
export default User;
