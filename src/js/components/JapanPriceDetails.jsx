import React from 'react';
import classNames from 'classnames';

const JapanPriceDetails = ({ description, type, label }) => (
  <div className='row descr-wrapper flex-box cols'>
    <div className='col top-align'>
        <h1 className={classNames(type, 'details-heading')}>{label}</h1>
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
