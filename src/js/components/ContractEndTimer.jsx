import React from 'react';
import text from '../helpers/text';
import classNames from 'classnames';

const ContractEndTimer = ({ children, alert }) => (
  <div className={classNames('countdown-timer align-end', { alert })}>
  <span className='labek'>{text('Remaining time')}</span> {children}
</div>);


ContractEndTimer.displayName = 'ContractEndTimer';
ContractEndTimer.propTypes = {
  children: React.PropTypes.node,
  alert: React.PropTypes.bool,
};

export default ContractEndTimer;
