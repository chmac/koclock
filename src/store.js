import { createStore } from "redux";

const REAL_TIME_AT_MINUTES = [2, 17, 32, 47];
const isSpecial = min => REAL_TIME_AT_MINUTES.includes(min % 60);

const TICK = "TICK";
const tick = () => ({
  type: TICK,
  payload: {
    now: Math.floor(Date.now() / 1e3 / 60),
    random: Math.floor(Math.random() * 1440)
  }
});

const empty = {
  time: 0,
  show: 0
};

const reducer = (state = empty, action) => {
  const { type, payload } = action;

  if (type === TICK) {
    const { now, random } = payload;
    const { time } = state;

    // If `time` has not changed, return unmodified state
    if (now === time) {
      return state;
    }

    // If `time` will show one of our target minute values, then set `show` to
    // the real time
    if (isSpecial(now)) {
      return {
        time: now,
        show: now
      };
    }

    return {
      time: now,
      // If now + random is one of our special minutes, then do not show it, but
      // instead show the real time. This cannot be one of our special minutes
      // otherwise we would have returned above.
      show: isSpecial(now + random) ? now : now + random
    };
  }

  return state;
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

// Dispatch a tick action every 5 seconds
setInterval(() => {
  store.dispatch(tick());
}, 5 * 1e3);
