class Localizable {
  constructor(hash = {}) {
    this.texts = Object.keys(hash).reduce((newHash, key) => {
      newHash[key.replace(/{JAPAN_ONLY}/, '')] = hash[key];
      return newHash;
    }, {});
  }

  localize(text, params) {
    const index = text.replace(/[\s|.]/g, '_');
    // only do templating when explicitly required
    const _text = this.texts[index] || text;
    return params ? this.template(_text, params) : _text;
  }

  template(string, content) {
    return string.replace(/\[_(\d+)\]/g, (s, index) => {
      return content[(Number(index)) - 1];
    });
  }
}

let local;
const text = (text, params) => {
  if (!local) {
    local = typeof window.text !== 'undefined' ?
      new Localizable(window.text.texts) :
      new Localizable();
  }

  return local.localize(text, params);
};

export default text;
