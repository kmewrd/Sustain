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

})
