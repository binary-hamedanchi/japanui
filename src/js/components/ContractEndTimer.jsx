import React from 'react';
import text from '../helpers/text';
import moment from 'moment';

let prevTimeLeft;
let resultStr;
const ContractEndTimer = ({ timeLeft }) => {
  if (prevTimeLeft !== timeLeft) {
    const duration = moment.duration(timeLeft * 1000);

    const result = [];
    const months = duration.months();
    if (months) {
      result.push(`${months}${text('months')}`);
    }

    const days = duration.days();
    if (days) {
      result.push(`${days}${text('days')}`);
    }

    const hours = duration.hours();
    if (hours) {
      result.push(`${hours}${text('hours')}`);
    }

    const minutes = duration.minutes();
    if (minutes) {
      result.push(`${minutes}${text('minutes')}`);
    }

    const seconds = duration.seconds();
    result.push(`${seconds}${text('seconds')}`);

    resultStr = result.join(' ');
    prevTimeLeft = timeLeft;
  }

  return <div id='countdown-timer'>{resultStr}</div>;
};

ContractEndTimer.displayName = 'ContractEndTimer';
ContractEndTimer.propTypes = {
  timeLeft: React.PropTypes.string,
};

export default ContractEndTimer;
