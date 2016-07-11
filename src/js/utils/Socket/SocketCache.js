import cache from 'memory-cache';
import hash from 'object-hash';

export default class SocketCache {
  constructor(expiry = {}) {
    this.expiry = expiry;

    return this;
  }

  put(req, res) {
    if (req && res && this.expiry[res.msg_type]) {
      cache.put(hash(req), res, this.expiry[res.msg_type] * 1000);
    }
    return;
  }

  get(req) {
    return req ? cache.get(hash(req)) : undefined;
  }
}

