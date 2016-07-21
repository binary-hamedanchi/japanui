import React from 'react';
import { Map } from 'immutable';
import Spot from './Spot';

let prevSpot = Map();
let spots = [];
let dyn = '';

const SpotContainer = ({ spot }) => {
  const quote = spot.get('quote');
  const time = spot.get('time');

  if (time !== prevSpot.get('time')) {
    if (quote > prevSpot.get('quote')) {
      dyn = '⬆';
    } else if (quote < prevSpot.get('quote')) {
      dyn = '⬇';
    } else {
      dyn = '';
    }

    spots.push({
      date: time,
      value: quote,
    });
    if (spots.length > 10) {
      spots.shift();
    }
  }

  prevSpot = spot;
  if (spot.isEmpty()) {
    spots = [];
    dyn = '';
  }

  return <Spot quote={quote} dyn={dyn} spots={spots}/>;
};

SpotContainer.displayName = 'SpotContainer';
SpotContainer.propTypes = {
  spot: React.PropTypes.instanceOf(Map),
};

export default SpotContainer;
