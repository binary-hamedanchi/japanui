import * as ActionsCreators from '../actions/ActionsCreators';

export default function addAppendEventListener() {
  (function($) {
      var origAppend = $.fn.append;
      $.fn.append = function () {
          return origAppend.apply(this, arguments).trigger('append');
      };
  })(jQuery);
  $('body').bind('append', function(e) {
    if(e.target.id === 'contract_sell_wrapper') {
      ActionsCreators.enablePriceButtons();
    }
  });
}
