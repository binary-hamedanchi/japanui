const TradingAnalysis = () =>
  (typeof window.TradingAnalysis !== 'undefined' ? window.TradingAnalysis : {
    request: () => {},
    digit_info: () => {},
    set_digit_info: () => {},
    japan_info: () => {},
    getActiveTab: () => {},
    bindAnalysisTabEvent: () => {},
  });

export default TradingAnalysis;
