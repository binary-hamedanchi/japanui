import React from 'react';
import text from '../helpers/text';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

const Spot = ({ quote, dyn, spots }) => (<div className='gr-row spot'>
  <div className='gr-adapt'>{text('Spot')}: {quote}<span className='spot-dyn'>{dyn}</span></div>
  <div className='gr-adapt'>
    <Sparklines
      data={spots.map(x => x.value)}
      style={{ width: 100, height: 30 }}
      width={100}
      height={30}
      margin={5}>
      <SparklinesLine style={{ stroke: "#394171" }}/>
      <SparklinesSpots />
    </Sparklines>
    </div>
</div>);

Spot.displayName = 'Spot';
Spot.propTypes = {
  quote: React.PropTypes.string,
  dyn: React.PropTypes.string,
  spots: React.PropTypes.array,
};

export default Spot;
