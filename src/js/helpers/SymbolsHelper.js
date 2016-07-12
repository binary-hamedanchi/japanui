import Immutable from 'immutable';
import config from 'config';

export default class SymbolsHelper {

  static getMarkets(symbols = Immutable.List(), filters = {}) {
    const markets = this.getList(symbols, 'market', filters);
    return markets;
  }

  static getMarket(symbols, market) {
    return this.getMarkets(symbols).get(market);
  }

  static isMarketOpened(symbols = Immutable.List(), checkMarket = '') {
    const openedMarkets = this.getMarkets(symbols, { state: 1 });
    return Boolean(openedMarkets.get(checkMarket));
  }

  static getSubMarkets(symbols = Immutable.List(), market = '', filters = {}) {
    const newFilters = Object.assign({}, filters);
    newFilters.market = market;
    const subMarkets = this.getList(symbols, 'submarket', newFilters);
    return subMarkets;
  }

  static getSymbols(symbols = Immutable.List(), market, filters = {}) {
    let resultSymbols = this.getList(symbols, 'symbol', Object.assign({}, filters, { market }));
    if (resultSymbols.isEmpty()) {
      resultSymbols = this.getList(symbols,
        'symbol',
        Object.assign({}, filters, { submarket: market }));
    }

    return resultSymbols;
  }

  static getSymbol(symbols = Immutable.List(), symbol = '') {
    const filteredSymbols = symbols.filter((symbolObj) => symbolObj.get('symbol') === symbol);
    return filteredSymbols.first();
  }

  static isSubMarketOpened(symbols = Immutable.List(), market = '', checkSubMarket = '') {
    const openedSubMarkets = this.getSubMarkets(symbols, market, { state: 1 });
    return Boolean(openedSubMarkets.get(checkSubMarket));
  }

  static getList(symbols = Immutable.List(), type = 'symbol', filters = {}) {
    const order = SymbolsHelper._getMarketsOrder();
    return symbols
      .sort((symbol1, symbol2) => this._sortSymbol(symbol1, symbol2, order))
      .groupBy((symbol) => symbol.get(type))
      .map(this._splashSymbols)
      .map(this._updateState)
      .filter((symbol) => this._filterSymbol(symbol, filters));
  }

  static _getMarketsOrder() {
    return config.marketsOrder;
  }

  static _splashSymbols(groupedSymbols = Immutable.List()) {
    return groupedSymbols.reduce((result, symbol) => {
      let newResult = result.isEmpty() ? symbol : result;
      symbol.forEach((value, key) => {
        if (newResult.get(key) !== value) {
          newResult = newResult.delete(key);
        }
      });

      return newResult;
    }, Immutable.Map());
  }

  static _updateState(symbol = Immutable.Map()) {
    const exchangeIsOpen = !symbol.has('exchange_is_open') ||
      Boolean(symbol.get('exchange_is_open'));
    const isTradingSuspended = !symbol.has('is_trading_suspended') ||
      Boolean(symbol.get('is_trading_suspended'));
    const newSymbol = symbol
      .set('state', exchangeIsOpen && !isTradingSuspended)
      .delete('exchange_is_open')
      .delete('is_trading_suspended');
    return newSymbol;
  }

  static _filterSymbol(symbol = Immutable.Map(), filters = {}) {
    let result = true;
    const checkFilters = Object.assign({}, filters);
    if (checkFilters.state !== undefined) {
      checkFilters.state = Boolean(checkFilters.state);
    }

    Object.keys(checkFilters).forEach((key) => {
      result = result && symbol.get(key) === checkFilters[key];
    });

    return Boolean(result);
  }

  static _sortSymbol(symbol1, symbol2, order) {
    let result;
    if (order[symbol1.get('submarket')] === order[symbol2.get('submarket')]) {
      result = symbol1.get('symbol') < symbol2.get('symbol') ? -1 : 1;
    } else {
      result = order[symbol1.get('submarket')] - order[symbol2.get('submarket')];
    }

    return result;
  }
}
