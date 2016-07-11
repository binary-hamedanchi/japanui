import { List, Map, OrderedMap } from 'immutable';
import config from 'config';

export default class ContractsHelper {
  static getCategories(contracts = List()) {
    const order = this._getCategoriesOrder();
    return this.filter(contracts).groupBy((contract) => contract.get('contract_category'))
      .map((contracts) => contracts.first().get('contract_category'))
      .sort((contract1, contract2) => order[contract1] - order[contract2]);
  }

  static hasCategory(contracts = List(), category = '') {
    const categories = this.getCategories(contracts);
    return categories.has(category);
  }

  static getStartTypes(contracts = List(), category = '') {
    const order = {
      spot: 1,
      forward: 2,
    };

    const categoryMap = this.filter(contracts, { contract_category: category })
      .reduce((startTypes, contract) => (
        startTypes.set(contract.get('start_type'), Map({
          type: contract.get('start_type'),
          times: contract.get('forward_starting_options', List()),
        }))), Map())
      .sort((type1, type2) => order[type1.get('type')] - order[type2.get('type')]);

    return categoryMap;
  }

  static getDurationsMap(contracts, category, startType = 'spot') {
    const {
      minDuration,
      maxDuration,
      minTicks,
      maxTicks,
    } = this._getDurationRange(contracts, category, startType);

    let durationsMap = OrderedMap();
    if (minTicks && maxTicks) {
      durationsMap = durationsMap.set('t', Map({
        min: parseInt(minTicks, 10),
        max: parseInt(maxTicks, 10),
      }));
    }

    let buildedDurations = OrderedMap();
    if (minDuration.type && maxDuration.type) {
      buildedDurations = this._buildDurations(minDuration, maxDuration);
    }

    return durationsMap.merge(buildedDurations);
  }

  static getTradingPeriods(contracts, category) {
    return this
      .filter(contracts, { contract_category: category })
      .reduce((contracts, contract) => {
        const start = contract.getIn(['trading_period', 'date_start', 'epoch']);
        const end = contract.getIn(['trading_period', 'date_expiry', 'epoch']);
        return contracts.set(`${start}_${end}`, Map({
          duration: contract.getIn(['trading_period', 'duration']),
          start,
          end,
        }));
      }, Map())
      .reduce((contracts, contract) => contracts.push(contract), List())
      .sort((period1, period2) => {
        if (period2.get('end') - period1.get('end')) {
          return period1.get('end') - period2.get('end');
        }
        return period2.get('start') - period1.get('start');
      });
  }

  static getJapanBarriers(contracts, category, startDate, endDate) {
    return this.filter(contracts, { contract_category: category })
      .filter((contract) => {
        return (contract.getIn(['trading_period', 'date_expiry', 'epoch']) == endDate &&
          contract.getIn(['trading_period', 'date_start', 'epoch']) == startDate);
      }).getIn([0, 'available_barriers'], List());
  }

  static getExpirySelectTypes(...args) {
    const durationsMap = this.getDurationsMap(...args);
    const order = {
      duration: 1,
      endtime: 2,
    };

    let expirySelectTypes = OrderedMap();
    if (durationsMap.size) {
      expirySelectTypes = expirySelectTypes.set('duration', 'duration');
    }

    if (durationsMap.has('d')) {
      expirySelectTypes = expirySelectTypes.set('endtime', 'endtime');
    }

    return expirySelectTypes.sort((type1, type2) => order[type1] - order[type2]);
  }

  static getBarriers(contracts, category, startType = 'spot', expiryType) {
    return this.filter(contracts, {
      contract_category: category,
      start_type: startType,
      expiry_type: expiryType,
    }).reduce((barriers, contract) => {
      let nextBarriers = barriers || Map();
      const barrierFields = ['barrier', 'barriers', 'low_barrier', 'high_barrier'];
      barrierFields.forEach((field) => {
        if (contract.has(field)) {
          nextBarriers = nextBarriers.set(field, contract.get(field));
        }
      });

      return nextBarriers;
    }, Map());
  }

  static getContractTypes(contracts, category) {
    return this
      .filter(contracts, {
        contract_category: category,
      })
      .reduce((res, contract) => res.set(contract.get('contract_type'), 1), Map())
      .keySeq();
  }

  static getDigitRange(contracts, category) {
    const digitCategory = this.filter(contracts, { contract_category: category }).first();
    return digitCategory && digitCategory.get('last_digit_range') ?
      digitCategory.get('last_digit_range') : List();
  }

  static filter(inputContracts, filters = {}) {
    const contracts = this._patchContracts(inputContracts);
    return contracts.filter((contract) => {
      const result = Object.keys(filters).reduce((result, filterName) => {
        const nextResult = result && filters[filterName] === contract.get(filterName);
        return nextResult;
      }, true);

      return result;
    });
  }

  static _getDurationRange(contracts, category, startType) {
    const filteredContracts = this.filter(contracts, {
      contract_category: category,
      start_type: startType,
    });

    const allDurations = this._getAllDurations();
    let minDuration = {};
    let maxDuration = {};
    let minTicks = 0;
    let maxTicks = 0;

    filteredContracts.forEach((contract) => {
      const minDur = contract
        .get('min_contract_duration')
        .match(/^([0-9]+)([a-z]+?)$/);
      const maxDur = contract
        .get('min_contract_duration')
        .match(/^([0-9]+)([a-z]+?)$/);
      if (minDur && maxDur) {
        const minDurType = minDur[2];
        const minDurValue = parseInt(minDur[1], 10);
        const maxDurType = maxDur[2];
        const maxDurValue = parseInt(maxDur[1], 10);
        if (minDurType === 't') {
          minTicks = minDurValue < minTicks || !minTicks ? minDurValue : minTicks;
          maxTicks = maxDurValue > maxTicks || !maxTicks ? maxDurValue : maxTicks;
        } else {
          if (!minDuration.type ||
            allDurations[minDurType].order < allDurations[minDuration.type].order ||
            allDurations[minDurType].order === allDurations[maxDuration.type].order &&
            minDurValue < minDuration.value) {
            minDuration = {
              type: minDurType,
              value: parseInt(minDur[1], 10),
            };
          }

          if (!maxDuration.type ||
            allDurations[maxDurType].order > allDurations[maxDuration.type].order ||
            allDurations[maxDurType].order === allDurations[maxDuration.type].order &&
            maxDurValue > maxDuration.value) {
            maxDuration = {
              type: maxDurType,
              value: parseInt(maxDurValue, 10),
            };
          }
        }
      }
    });

    return {
      minDuration,
      maxDuration,
      minTicks,
      maxTicks,
    };
  }

  static _buildDurations(min, max) {
    const allDurations = this._getAllDurations();
    let durations = OrderedMap();

    Object.keys(allDurations).sort((duration1, duration2) => (
      allDurations[duration1].order - allDurations[duration2].order
    )).forEach((duration) => {
      if (allDurations[duration].order >= allDurations[min.type].order &&
        allDurations[duration].order <= allDurations[max.type].order
      ) {
        durations = durations
          .setIn([duration, 'min'], min.type === duration ? min.value : 1)
          .setIn([duration, 'max'], max.type === duration ?
            max.value : max.value * allDurations[max.type][duration]);
      }
    });

    return durations;
  }

  static _getAllDurations() {
    return {
      s: { order: 1 },
      m: { order: 2, s: 60 },
      h: { order: 3, s: 3600, m: 60 },
      d: { order: 4, s: 86400, m: 1440, h: 24 },
    };
  }

  static _getCategoriesOrder() {
    return config.categoriesOrder;
  }

  static _patchContracts(contracts = List()) {
    return contracts.map((contract) => {
      let nextContract = contract;

      //  Patch for callput = risefall + higherlower
      if (contract.get('contract_category') === 'callput') {
        if (contract.get('barrier_category') === 'euro_atm') {
          nextContract = nextContract
            .set('contract_category', 'risefall')
            .set('contract_category_display', 'Rise/Fall');
        } else if (contract.get('barrier_category') === 'euro_non_atm') {
          nextContract = nextContract
            .set('contract_category', 'higherlower')
            .set('contract_category_display', 'Higher/Lower');
        }
      }

      // Patch for digits
      if (contract.get('contract_category') === 'digits') {
        if (contract.get('contract_display') === 'differs' ||
          contract.get('contract_display') === 'matches') {
          nextContract = nextContract
            .set('contract_category', 'matchesdiffers')
            .set('contract_category_display', 'Matches/Differs');
        } else if (contract.get('contract_display') === 'even' ||
          contract.get('contract_display') === 'odd') {
          nextContract = nextContract
            .set('contract_category', 'evenodd')
            .set('contract_category_display', 'Even/Odd');
        } else if (contract.get('contract_display') === 'over' ||
          contract.get('contract_display') === 'under') {
          nextContract = nextContract
            .set('contract_category', 'overunder')
            .set('contract_category_display', 'Over/Under');
        }
      }

      return nextContract;
    });
  }
}
