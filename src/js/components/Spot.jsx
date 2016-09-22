import React from 'react';
import text from '../helpers/text';
import Sparkline from 'react-sparkline';

const Spot = ({ quote, dyn, spots }) => (<div className='gr-row spot'>
  <div className='gr-adapt'>{text('Spot')}: {quote}<span className='spot-dyn'>{dyn}</span></div>
  <div className='gr-adapt'>
  <Sparkline
    data={spots}
    interpolate='none'
    strokeColor='#2bade0'
    strokeWidth='2px'/></div>
</div>);

Spot.displayName = 'Spot';
Spot.propTypes = {
  quote: React.PropTypes.string,
  dyn: React.PropTypes.string,
  spots: React.PropTypes.array,
};

export default Spot;
