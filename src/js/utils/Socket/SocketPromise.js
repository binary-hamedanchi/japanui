export default class SocketPromise {
  constructor(id) {
    let resolve;
    let reject;

    const promise = new Promise((...args) => {
      [resolve, reject] = [...args];
    });

    promise.resolve = resolve;
    promise.reject = reject;
    promise.id = id;

    return promise;
  }
}

