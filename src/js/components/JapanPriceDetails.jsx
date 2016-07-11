import React from 'react';

const JapanPriceDetails = ({ description, type }) => (<div>
  <h1>{type}</h1>
  <div className='descr'>{description}</div>
</div>);

JapanPriceDetails.displayName = 'JapanPriceDetails';
JapanPriceDetails.propTypes = {
  description: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
};

export default JapanPriceDetails;
