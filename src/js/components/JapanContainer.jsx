// Libs
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import React from 'react';

// Actions
import * as Actions from '../actions/Actions';

// Helpers
import SymbolsHelper from '../helpers/SymbolsHelper';
import ContractsHelper from '../helpers/ContractsHelper';

// Components
import FetchingBox from './FetchingBox';
import JapanForm from './JapanForm';
// import JapanTable from './JapanTable';

const getSymbols = (symbols = List()) => {
  // return SymbolsHelper.getSymbols(symbols, 'major_pairs')
  return SymbolsHelper.getSymbols(symbols, 'volidx')
    .toList()
    .map((symbol) => List.of(symbol.get('symbol'), symbol.get('display_name')));
};

const getCategories = (contracts = List(), texts = Map()) => {
  const categoryNames = {
    higherlower: texts.get('textHighLow'),
    touchnotouch: texts.get('textTouchNoTouch'),
    endsinout: texts.get('textEndInEndOut'),
    staysinout: texts.get('textStayInBreakOut'),
  };

  return ContractsHelper.getCategories(contracts)
    .map((name, category) => List.of(category, categoryNames[category]))
    .toList();
};

const getPeriods = (contracts = List(), category = '', texts = Map()) => {
  const periods = ContractsHelper.getTradingPeriods(contracts, category);
  return periods.map((period) => {
    const formatDate = moment.utc(period.get('end') * 1000).utcOffset('+0800')
      .format(`MM[${texts.get('textJapanPeriodM')}] ` +
        `DD[${texts.get('textJapanPeriodD')}] HH:mm [(${period.get('duration')})]`);

    return List.of(`${period.get('start') }_${period.get('end')}`, formatDate);
  });
};

const getPaouts = (payouts = List()) => {
  return payouts.map((payout) => List.of(payout, `¥ ${payout}`));
};

const getTable = (() => {
  let table = Map();

  return (proposals = Map(), errors = Map(), payout = 0) => {
    const types = proposals.concat(errors).reduce((types, val, shortCode) => {
      const params = shortCode.split('|');
      return types.set(params[1], 1);
    }, Map()).keySeq();

    const getOpposite = (type) => types.filter((t) => type !== t).first();

    table = proposals.concat(errors)
      .reduce((nextTable, proposal, shortCode) => {
        const params = shortCode.split('|');
        const barrier = params[3];
        const contractType = params[1];

        const isActive = Boolean(proposal.getIn(['value', 'ask_price']));
        const askPrice = Math.round(proposal.getIn(['value', 'ask_price'])) || payout;
        const oppositeBidPrice = payout - askPrice;

        const prev = table.getIn([barrier, contractType, 'ask'], Map());
        const time = proposal.getIn(['value', 'time']) || proposal.get('time');

        let dynamics = prev.get('dynamics', 0);
        if (prev.get('time', time) !== time) {
          if (prev.get('val') > askPrice) {
            dynamics = 1;
          } else if (prev.get('val') < askPrice) {
            dynamics = -1;
          } else {
            dynamics = 0;
          }
        }

        const ask = Map({
          val: askPrice,
          time,
          isActive,
          dynamics,
        });

        const oppositeBid = Map({
          val: oppositeBidPrice,
          time,
          isActive,
          dynamics: -dynamics,
        });

        return nextTable
          .setIn([barrier, contractType, 'ask'], ask)
          .setIn([barrier, getOpposite(contractType), 'bid'], oppositeBid);
      }, Map());

    return table
      .reduce((tableList, value, barrier) => tableList.push(value.set('barrier', barrier)), List())
      .sort((item1, item2) => item1.get('barrier') > item2.get('barrier') ? -1 : 1);
  };
})();

const Japan = (props) => {
  const showFetchingBox = props.symbols.isEmpty() ||
    props.categories.isEmpty() ||
    props.table.isEmpty();

  console.log(props.table.toJS());

  return (<div className='japan-ui'>
    {showFetchingBox ? <FetchingBox /> : null}
    <JapanForm
      actions={props.actions}
      symbols={props.symbols}
      symbol={props.values.get('symbol')}
      categories={props.categories}
      category={props.values.get('category')}
      periods={props.periods}
      period={props.values.get('period')}
      payouts={props.payouts}
      payout={props.values.get('payout')}/>
  </div>);
  /*
    
  */

  //  <JapanTable
  //    table={props.table}
  //    actions={props.actions}
  //    texts={props.texts}/>
};

Japan.displayName = 'Japan';
Japan.propTypes = {
  actions: React.PropTypes.object.isRequired,
  symbols: React.PropTypes.instanceOf(List).isRequired,
  categories: React.PropTypes.instanceOf(List).isRequired,
  periods: React.PropTypes.instanceOf(List).isRequired,
  payouts: React.PropTypes.instanceOf(List).isRequired,
  values: React.PropTypes.instanceOf(Map).isRequired,
  table: React.PropTypes.instanceOf(List).isRequired,
  texts: React.PropTypes.instanceOf(Map).isRequired,
};

const mapStateToProps = (state) => ({
  symbols: getSymbols(state.get('symbols')),
  categories: getCategories(state.getIn(['contracts', 'available']), state.get('texts')),
  periods: getPeriods(
    state.getIn(['contracts', 'available']),
    state.getIn(['values', 'category']),
    state.get('texts')),
  payouts: getPaouts(state.get('payouts')),
  table: getTable(state.getIn(['streams', 'proposals']),
    state.getIn(['errors', 'proposals']), state.getIn(['values', 'payout'])),
  texts: state.get('texts', Map()),
  values: state.get('values', Map()),
});

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

const JapanContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Japan);

JapanContainer.displayName = 'JapanContainer';

export default JapanContainer;
