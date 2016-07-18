const text = (text) => typeof window.text !== 'undefined' ?
  window.text.localize(text) : text;

export default text;
