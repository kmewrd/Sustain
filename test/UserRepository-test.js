import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';
import testData from './test-data';

describe('User Repository', () => {
  let user1;
  let user2;
  let testUsers;
  let userRepository;
  let testHydrationLog;
  let testSleepLog;
  let testActivityLogs;

  beforeEach(() => {
    testUsers = testData.userData;
    testHydrationLog = [testData.hydrationData[0]];
    testSleepLog = [testData.sleepData[0], testData.sleepData[2]];
    testActivityLogs = [testData.activityData[0], testData.activityData[2]];
    user1 = new User(testUsers[0]);
    user2 = new User(testUsers[1]);
    userRepository = new UserRepository(testUsers, testHydrationLog, testSleepLog, testActivityLogs);
  });

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
    expect(userRepository.getAvgUserSleepQuality()).to.equal('2.4')
  });
});
