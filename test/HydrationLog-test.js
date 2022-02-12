import { expect } from 'chai';
import HydrationLog from '../src/classes/HydrationLog';

describe('HydrationLog', () => {

let hydrationLog;
let data;
beforeEach(() => {
 data = [{
   "userID":1,
   "date":"2019/06/15",
   "numOunces":37
     }];

  hydrationLog = new HydrationLog(data)
})

it(' should be a function', () => {
  expect(HydrationLog).to.be.a('function')
});

it('should be an instance of HydrationLog', () => {
  expect(hydrationLog).to.be.an.instanceof(HydrationLog)
})


//  should have a property of userID
//  should have a property of date
//  should have a property of numOunces
})