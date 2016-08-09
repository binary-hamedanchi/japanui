import moment from 'moment';

export const WS_API = Symbol('WS API');

const SocketMiddleware = (socket) => () => (next) => (action) => {
  let resolve;
  let reject;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  if (!action) {
    reject();
  } else {
    const apiRequest = action[WS_API];

    if (apiRequest && apiRequest.close) {
      socket.close();
      resolve(next(action));
    } else if (typeof apiRequest !== 'object' ||
      typeof apiRequest.types !== 'object' ||
      apiRequest.types.length !== 3) {
      resolve(next(action));
    } else {
      const finalAction = (action, data) => {
        const time = { time: Number(moment()) };
        const result = Object.assign({}, action, data, time);
        delete result[WS_API];
        return result;
      };

      const [pendingType, failureType, successType] = apiRequest.types;
      delete apiRequest.types;

      next(finalAction(action, {
        type: pendingType,
      }));


      if (!apiRequest.subscribe) {
        promise = socket.request(apiRequest);
        promise.then((res) =>
          next(finalAction(action, {
            type: successType,
            payload: res,
          }))).catch((err) =>
          next(finalAction(action, {
            type: failureType,
            payload: err,
          })));
      } else {
        const stream = socket.stream(apiRequest);
        stream.map((res) => {
          const nextRes = Object.assign({}, res);

          if (!res.isError) {
            next(finalAction(action, {
              type: successType,
              payload: nextRes,
              stream,
            }));

            resolve(res);
          } else {
            delete nextRes.isError;
            next(finalAction(action, {
              type: failureType,
              payload: nextRes,
            }));

            reject(nextRes);
          }
        });
      }
    }
  }

  return promise;
};

export default SocketMiddleware;
