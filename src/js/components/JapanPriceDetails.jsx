import React from 'react';

const JapanPriceDetails = ({ description, type, label }) => (
  <div className='row descr-wrapper flex-box cols'>
    <div className='col'>
        <h1 className={`${type}-heading`}>{label}</h1>
    </div>
    <div className='col'>
      <div className='descr'>{description}</div>
    </div>
</div>);

JapanPriceDetails.displayName = 'JapanPriceDetails';
JapanPriceDetails.propTypes = {
  description: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default JapanPriceDetails;
