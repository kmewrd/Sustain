import { expect } from 'chai';
import User from '../src/classes/User'


describe('User', () => {
  let user;
  let userData1
  let userData2

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
    user1 = new User(userData1);
    user2 = new User(userData2)
 })

 it('should be a function', () => {
      expect(User).to.be.a('function')
 })

 it('should be an instance of User', () => {
      expect(user).to.be.an.instanceof(User)
 })

 it('should take in userData', () => {
      expect(user1.id).to.equal(1);
      expect(user1.name).to.equal("Luisa Hane");
      expect(user1.address).to.equal("15195 Nakia Tunnel, Erdmanport VA 19901-1697");
      expect(user1.email).to.equal("Diana.Hayes1@hotmail.com");
      expect(user1.strideLength).to.equal(4.5);
      expect(user1.dailySepGoal).to.equal(10000);
      expect(user1.friends.length).to.equal(3); 
 })

 it('should return first name', () => {
      expect(user2.returnFirstName()).to.equal("Jarvis");
 })

})