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
    testHydrationLog = testData.hydrationData;
    testSleepLog = testData.sleepData;
    testActivityLogs = testData.activityData;
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

  it('should get avg sleep quality for all users', () => {
    expect(userRepository.getAvgUserSleepQuality()).to.equal('9.1')
  });

  it('should get the average flights of stairs climbed on a specific day for all users', () => {
    expect(userRepository.getAvgUserFlightsClimbed('2019/06/15')).to.equal('13.0')
  });

  it('should get the average steps walked on a specific day for all users', () => {
    expect(userRepository.getAvgUserNumSteps('2019/06/15')).to.equal('3935.5')
  });

  it('should get the average miles walked on a specific day for all users', () => {
    expect(userRepository.getAvgUserMilesWalked('2019/06/15')).to.equal('2.2')
  });

  it('should get the average minutes active on a specific day for all users', () => {
    expect(userRepository.getAvgUserMinutesActive('2019/06/15')).to.equal('139')
  });
});
