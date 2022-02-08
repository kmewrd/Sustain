import { expect } from 'chai';
import userData from '../src/data/users';
import User from '../src/classes/User'


describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(userData);
 })

 it('should be a function', () => {
      expect(User).to.be.a('function')
 })

 it('should be an instance of User', () => {
      expect(user).to.be.an.instanceof(User)
 })

})