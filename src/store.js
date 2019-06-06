import { createStore } from "redux";

const SHOW_REAL_TIME_ONE_IN_X = 5;

const REAL_TIME_AT_MINUTES = [2, 17, 32, 47];
const isSpecial = min => REAL_TIME_AT_MINUTES.includes(min % 60);

const TICK = "TICK";
const tick = () => ({
  type: TICK,
  payload: {
    nowMinutes: Math.floor(Date.now() / 1e3 / 60),
    showRealTime: Math.floor(Math.random() * SHOW_REAL_TIME_ONE_IN_X) === 0
  }
});

const empty = {
  hasInitialised: false,
  isShowingReal: false,
  realTimeMinutes: 0,
  currentKTimeBlockStartedAtMinute: 0,
  currentKTimeBlockSecondsAdded: 0 // When this hits 18 * 4, we roll the dice again
};

const reducer = (state = empty, action) => {
  const { type, payload } = action;

  if (type === TICK) {
    const { nowMinutes, showRealTime } = payload;
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

const doTick = () => {
  store.dispatch(tick());
};

// Dispatch a tick action now and every 5 seconds
doTick();
setInterval(doTick, 5 * 1e3);
