import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';

describe('User Repository', () => {
  let user1;
  let user2;
  let testUsers;
  let userRepository;
  let testHydrationLog;
  let testSleepLog;

  beforeEach(() => {
   testUsers = [{
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [
      16,
      4,
      8
    ]
  },
  {
    "id": 2,
    "name": "Jarvis Considine",
    "address": "30086 Kathryn Port, Ciceroland NE 07273",
    "email": "Dimitri.Bechtelar11@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
    "friends": [
      9,
      18,
      24,
      19
    ]
  }];
    testHydrationLog = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 32
    }];

    testSleepLog = [{
      "userID": 1,
      "date": "2021/05/14",
      "hoursSlept": 6.1,
      "sleepQuality": 2
    },
    {
      "userID": 2,
      "date": "2020/05/14",
      "hoursSlept": 8,
      "sleepQuality": 6
    }];

    user1 = new User(testUsers[0]);
    user2 = new User(testUsers[1]);
    userRepository = new UserRepository(testUsers, testHydrationLog, testSleepLog);
 })

  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should have a users property', () => {
    expect(userRepository.users).to.deep.equal(testUsers);
  });

  it('should have a hydrationLogs property', () => {
    expect(userRepository.hydrationLogs).to.deep.equal(testHydrationLog)
  });

  it('should have a sleepLogs property', () => {
    expect(userRepository.sleepLogs).to.deep.equal(testSleepLog)
  });

  it('should be able to access user data by user\'s id', () => {
    userRepository.getUserById(1);
    expect(userRepository.hydrationLogs).to.deep.equal(testHydrationLog)
    expect(userRepository.sleepLogs).to.deep.equal(testSleepLog)
    expect(userRepository.users).to.deep.equal(testUsers)
  });

  it('should calculate average step goal amongst all users', () => {
    expect(userRepository.getAvgUserStepGoal()).to.equal(7500);
  });

  it('should be able to return any type of log for a user id', () => {
    userRepository.getUserLogs(testHydrationLog, 1)
    expect(userRepository.hydrationLogs).to.equal(testHydrationLog)
  });

  it('should be able to get avg user sleep quality', () => {
    expect(userRepository.getAvgUserSleepQuality()).to.equal(4)
  });
});
