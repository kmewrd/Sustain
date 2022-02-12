import { expect } from 'chai';
import User from '../src/classes/User';
import UserRepository from '../src/classes/UserRepository';
import HydrationLog from '../src/classes/HydrationLog';
import SleepLog from '../src/classes/SleepLog';

describe('User Repository', () => {
  let user1;
  let user2;
  let userData1;
  let userData2;
  let userRepository;
  let hydrationUser1;
  let sleepUser1;

  beforeEach(() => {
    userData1 = {
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
  }
  userData2 = {
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
  }
    hydrationUser1 = {
      "userID": 1,
      "date": "2019/06/15",
      "numOunces": 32
    }

    sleepUser1 = {
      "userID": 1,
      "date": "2021/05/14",
      "hoursSlept": 6.1,
      "sleepQuality": 2
    }

    user1 = new User(userData1);
    user2 = new User(userData2);
    userRepository = new UserRepository([user1, user2]);
 })


  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should hold all User objects', () => {
    expect(userRepository.users).to.deep.equal([user1, user2]);
    expect(userRepository.users[0]).to.be.an.instanceof(User);
  });

  it('should be able to access user data by user\'s id', () => {
    expect(userRepository.getUserById(1)).to.deep.equal(user1)
  });

  it('should calculate average step goal amongst all Users', () => {
    expect(userRepository.getAverageStepGoal()).to.equal(7500);
  });
});