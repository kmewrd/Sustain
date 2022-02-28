import { expect } from 'chai';
import ActivityLog from '../src/classes/ActivityLog';
import testData from './test-data';

describe('ActivityLog', () => {
  let activityLog;
  let data;

  beforeEach(() => {
    data = testData.activityData[0];
    activityLog = new ActivityLog(data);
  });

  it('should be a function', () => {
    expect(ActivityLog).to.be.a('function')
  });

  it('should be an instance of ActivityLog', () => {
    expect(activityLog).to.be.an.instanceof(ActivityLog)
  });

  it('should have a property of userID', () => {
    expect(activityLog.userID).to.equal(1)
  });

  it('should have a property of date', () => {
    expect(activityLog.date).to.equal('2019/06/15')
  });

  it('should have a property of numSteps', () => {
    expect(activityLog.numSteps).to.equal(3577)
  });

  it('should have a property of minutesActive', () => {
    expect(activityLog.minutesActive).to.equal(140)
  });

  it('should have a property of flightsOfStairs', () => {
    expect(activityLog.flightsOfStairs).to.equal(16)
  });
})
