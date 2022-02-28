import { expect } from 'chai';
import SleepLog from '../src/classes/SleepLog';
import testData from './test-data'

describe('SleepLog', () => {
  let sleepLog;
  let data;

  beforeEach(() => {
    data = testData.sleepData[3];
    sleepLog = new SleepLog(data)
  });

  it(' should be a function', () => {
    expect(SleepLog).to.be.a('function');
  });

  it('should be an instance of SleepLog', () => {
    expect(sleepLog).to.be.an.instanceof(SleepLog);
  });

  it('should have a property of userID', () => {
    expect(sleepLog.userID).to.equal(1);
  });

  it('should have a property of date', () => {
    expect(sleepLog.date).to.equal("2019/06/18");
  });

  it('should have a property of hoursSlept', () => {
    expect(sleepLog.hoursSlept).to.equal(10.4);
  });

  it('should have a property of sleepQuality', () => {
    expect(sleepLog.sleepQuality).to.equal(3.1);
  });
});
