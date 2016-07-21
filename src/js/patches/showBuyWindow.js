export default function showBuyWindow(contractId) {
  if (typeof window.$ !== 'function') {
    return;
  }

  if (typeof window.ViewPopupWS !== 'object') {
    return;
  }

  const button = window.$('<div />', { contract_id: contractId }).get(0);
  console.log(button, contractId);
  window.ViewPopupWS.init(button);
}
