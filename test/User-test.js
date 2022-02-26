import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';
// import testData from './test-data'


describe('User', () => {
  let user1;
  let testAPIData;
  let userRepository;
  let testSleepData;
  let testHydrationData;
  let testUserData;
  let testActivityData;

  beforeEach(() => {
    testAPIData = [{
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
    }];

    testHydrationData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 32
    },
    {
      "userID": 1,
      "date": "2019/06/14",
      "numOunces": 12
    }];

    testSleepData = [{
      "userID": 1,
      "date": "2021/05/14",
      "hoursSlept": 6,
      "sleepQuality": 2
    },
    {
      "userID": 1,
      "date": "2020/05/14",
      "hoursSlept": 8,
      "sleepQuality": 6
    }];

    testActivityData = [{
      "userID": 1,
      "date": "2019/06/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 2,
      "date":"2019/06/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    }];

    user1 = new User(testAPIData[0]);
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
    expect(user1.getAvgOuncesPerDay()).to.equal(22);
  });

  it('should get ounces by week', () => {
    expect(user1.getOuncesByWeek("2021/05/14")).to.deep.equal([32]);
  });

  it('should get avg hours slept per day', () => {
    expect(user1.getAvgHoursSleepPerDay()).to.equal('7.0');
  });

  it('should get avg sleep quality per day', () => {
    expect(user1.getAvgSleepQualityPerDay()).to.equal('4.0');
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
});
