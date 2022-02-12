 import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';


describe('User', () => {
  let user1;
  let testAPIData;
  let userRepository;
  let testSleepData;
  let testHydrationData;
  let testUserData;

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
      "date": "2019/06/15",
      "numOunces": 12
    }];

    testSleepData = [{
      "userID": 1,
      "date": "2021/05/14",
      "hoursSlept": 6.1,
      "sleepQuality": 2
    },
    {
      "userID": 1,
      "date": "2020/05/14",
      "hoursSlept": 8,
      "sleepQuality": 6
    }];

    user1 = new User(testAPIData[0]);
    testUserData = [user1];
    userRepository = new UserRepository(testUserData, testHydrationData, testSleepData)
  })

 it('should be a function', () => {
      expect(User).to.be.a('function')
 })

 it('should be an instance of User', () => {
      expect(user1).to.be.an.instanceof(User)
 })

 it('should take in userData', () => {
      expect(user1.id).to.equal(1);
      expect(user1.name).to.equal("Luisa Hane");
      expect(user1.address.length).to.equal(2);
      expect(user1.email).to.equal("Diana.Hayes1@hotmail.com");
      expect(user1.strideLength).to.equal(4.3);
      expect(user1.dailyStepGoal).to.equal(10000);
      expect(user1.friends.length).to.equal(3); 
 })

 it('should return first name', () => {
      expect(user1.returnFirstName()).to.equal("Luisa");
 });

 it('should have a method that returns avg ounces per day', () => {
   userRepository.getUserById(1)
   user1.getAvgOuncesPerDay()
   expect(user1.getAvgOuncesPerDay()).to.equal(22)
 })

})