import { createStore, combineReducers } from "redux";

const TICK = "TICK";
const tick = () => ({
  type: TICK,
  payload: {
    now: Math.floor(Date.now() / 1e3 / 60),
    random: Math.floor(Math.random() * 1440) - 720
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

    return {
      time: now,
      show: now + random
    };
  }

  return state;
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

window.tick = () => {
  store.dispatch(tick());
};
