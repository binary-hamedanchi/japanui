let texts = {};

const text = (text) => {
  if (!Object.keys(texts).length && typeof window.text !== 'undefined') {
    texts = Object.keys(window.text.texts).reduce((texts, key) => {
      texts[key.replace(/{JAPAN_ONLY}/, '')] = window.text.texts[key];
      return texts;
    }, {});
  }

  return texts[text] || text;
};

export default text;
