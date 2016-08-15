let texts = {};

const text = (text) => {
  if (!texts && typeof window.text !== 'undefined') {
    texts = window.text.texts.reduce((texts, val, key) => {
      texts[key.replace(/{JAPAN_ONLY}/, '')] = val;
      return texts;
    }, {});
  }

  return texts[text] || text;
};

export default text;
