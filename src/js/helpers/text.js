let texts = {};

const text = (text) => {
  if (!Object.keys(texts).length && typeof window.text !== 'undefined') {
    texts = window.text.texts.reduce((texts, val, key) => {
      texts[key.replace(/{JAPAN_ONLY}/, '')] = val;
      return texts;
    }, {});
  }

  return texts[text] || text;
};

export default text;
