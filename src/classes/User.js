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
  getOuncesByWeek(endDate) {
    const dateIndex = this.hydrationLogs.findIndex(log => {
      return log.date === endDate;
    });
    const weekLogs = this.hydrationLogs.slice(dateIndex - 7, dateIndex)
    const weekOunces = weekLogs.map(log => {
      return log.numOunces;
    })
    console.log(dateIndex)
    return weekOunces;
  }
}
//
export default User;
