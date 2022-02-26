import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';
import testData from './test-data';

describe('User', () => {
  let user1;
  let userData;
  let userRepository;
  let testSleepData;
  let testHydrationData;
  let testUserData;
  let testActivityData;

  beforeEach(() => {
    userData = testData.userData[0];
    testHydrationData = testData.hydrationData;
    testSleepData = testData.sleepData;
    testActivityData = testData.activityData;
    user1 = new User(userData);
    testUserData = [user1];
    userRepository = new UserRepository(testUserData, testHydrationData, testSleepData, testActivityData);
    userRepository.getUserById(1);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should take in userData', () => {
    expect(user1.id).to.equal(1);
    expect(user1.name).to.equal("Luisa Hane");
    expect(user1.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
    expect(user1.email).to.equal("Diana.Hayes1@hotmail.com");
    expect(user1.strideLength).to.equal(4.3);
    expect(user1.dailyStepGoal).to.equal(10000);
    expect(user1.friends.length).to.equal(3);
  });

  it('should return first name', () => {
    expect(user1.returnFirstName()).to.equal("Luisa");
  });

  it('should have a method that returns avg ounces per day', () => {
    expect(user1.getAvgOuncesPerDay()).to.equal(27);
  });

  it('should get ounces by week', () => {
    expect(user1.getOuncesByWeek("2021/05/14")).to.deep.equal([32, 12]);
  });

  it('should get avg hours slept per day', () => {
    expect(user1.getAvgHoursSleepPerDay()).to.equal('6.7');
  });

  it('should get avg sleep quality per day', () => {
    expect(user1.getAvgSleepQualityPerDay()).to.equal('3.4');
  });

  it('should get sleep hours by a specific date', () => {
    expect(user1.getSleepHoursByDay("2020/05/14")).to.equal(8);
  });

  it('should get sleep quality by a specific date', () => {
    expect(user1.getSleepQualityByDay("2020/05/14")).to.equal(6);
  });

  it('should get hours slept by week', () => {
    expect(user1.getHoursSleptByWeek("2020/05/14")).to.deep.equal([6]);
  });

  it('should get sleep quality by week', ()=> {
    expect(user1.getSleepQualityByWeek("2020/05/14")).to.deep.equal([2]);
  });

  it('should get miles walked by a specific date', () => {
    expect(user1.getMilesByDay('2019/06/16')).to.equal('5.4');
  });

  it('should get minutes active by a specific date', () => {
    expect(user1.getMinutesActiveByDay('2019/06/16')).to.equal(175);
  });

  // it('should get average number of minutes active by week', () => {
  //   expect(user1.getAvgMinutesActiveByWeek('2019/06/16')).to.equal(157.5);
  // });

  it('should calculate if a user has met their step goal', () => {
    expect(user1.getStepGoalAchievement('2019/06/16')).to.equal(false)
  });

  it('should get all days where step goal was exceeded', () => {
    expect(user1.getDaysWhereStepGoalMet()).to.deep.equal([])
  });
});
