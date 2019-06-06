import { createStore, Reducer, Action, ActionCreator } from "redux";

const NUMBER_OF_SECONDS_PER_K_MINUTE = 42;
const NUMBER_OF_MISSING_K_SECONDS_PER_MINUTE =
  60 - NUMBER_OF_SECONDS_PER_K_MINUTE;
const NUMBER_OF_K_TIME_MINUTES_PER_BLOCK = 4;
const K_TIME_DRIFT_PLUS_OR_MINUS_MINUTES = 90;

const getNowSeconds = () => {
  return Math.floor(Date.now() / 1e3);
};

// One in n+1 (5) chance that we want to show the real time
export const chooseReal = () => {
  return (
    Math.floor(Math.random() * (NUMBER_OF_K_TIME_MINUTES_PER_BLOCK + 1)) === 0
  );
};

// Get a number of minutes in the range -90 to +90
const getKTimeDriftMinutes = () => {
  return (
    Math.floor(Math.random() * K_TIME_DRIFT_PLUS_OR_MINUS_MINUTES * 2) -
    K_TIME_DRIFT_PLUS_OR_MINUS_MINUTES
  );
};

const TICK = "TICK";
interface TickAction extends Action<typeof TICK> {
  payload: {
    nowSeconds: number;
    kTimeDriftMinutes: number;
    showRealNext: boolean;
  };
}
const tick: ActionCreator<TickAction> = () => {
  return {
    type: TICK,
    payload: {
      nowSeconds: getNowSeconds(),
      kTimeDriftMinutes: getKTimeDriftMinutes(),
      showRealNext: chooseReal()
    }
  };
};

type Actions = TickAction;

const REAL_TIME = "REAL_TIME";
interface RealTime {
  type: typeof REAL_TIME;
  realTimeMinute: number;
}
const K_TIME = "K_TIME";
interface KTime {
  type: typeof K_TIME;
  kTimeSeconds: number;
  plusMissingSeconds: number;
}
export interface State {
  showMintues: number;
  time?: RealTime | KTime;
}
const empty: State = {
  showMintues: 0
};

const realTimeToShowMinutes = (realTime: RealTime): number => {
  return realTime.realTimeMinute;
};

const kTimeToShowMinutes = (kTime: KTime): number => {
  return Math.floor((kTime.kTimeSeconds + kTime.plusMissingSeconds) / 60);
};

const isPartwayThroughKBlock = (kTime: KTime): boolean => {
  return (
    kTime.plusMissingSeconds <
    NUMBER_OF_K_TIME_MINUTES_PER_BLOCK * NUMBER_OF_MISSING_K_SECONDS_PER_MINUTE
  );
};

/**
 * We advance K time by adding 42 seconds to the time and 18 seconds to the
 * extra k time
 */
const advanceKTime = (time: KTime, action: TickAction): State => {
  const newTime = {
    ...time,
    kTimeSeconds: time.kTimeSeconds + NUMBER_OF_SECONDS_PER_K_MINUTE,
    plusMissingSeconds:
      time.plusMissingSeconds + NUMBER_OF_MISSING_K_SECONDS_PER_MINUTE
  };

  return {
    showMintues: kTimeToShowMinutes(newTime),
    time: newTime
  };
};

// TODO
const generateKTime = (
  nowSeconds: number,
  kTimeDriftMinutes: number
): KTime => {
  return {
    type: K_TIME,
    kTimeSeconds: nowSeconds + kTimeDriftMinutes * 60,
    plusMissingSeconds: NUMBER_OF_MISSING_K_SECONDS_PER_MINUTE
  };
};

const generateRealTime = (nowSeconds: number): RealTime => {
  return {
    type: REAL_TIME,
    realTimeMinute: Math.floor(nowSeconds / 60)
  };
};

const reducer: Reducer<State, Actions> = (state = empty, action) => {
  switch (action.type) {
    case TICK: {
      if (state.time) {
        switch (state.time.type) {
          case REAL_TIME: {
            // If we are showing the correct real time, then there's nothing else to do
            if (state.showMintues === action.payload.nowSeconds * 60) {
              return state;
            }
            break;
          }
          case K_TIME: {
            // If we are showing the real k time, then there's nothing else to do
            // TODO How do we know if it's time for the next k minute?
            if (kTimeToShowMinutes(state.time) === state.showMintues) {
              return state;
            }

            // If we're in the middle of a K block, but not showing the current
            // time, then we need to advance k time one k minute forward
            if (isPartwayThroughKBlock(state.time)) {
              return {
                ...state,
                ...advanceKTime(state.time, action)
              };
            }
            break;
          }
        }
      }
      // When we show real time, we always show ktime next. Otherwise, if the
      // random choice does not say show real time, then we show ktime.
      if (
        (state.time && state.time.type === REAL_TIME) ||
        !action.payload.showRealNext
      ) {
        const time = generateKTime(
          action.payload.nowSeconds,
          action.payload.kTimeDriftMinutes
        );
        return {
          ...state,
          showMintues: kTimeToShowMinutes(time),
          time
        };
      } else {
        const time = generateRealTime(action.payload.nowSeconds);
        return {
          ...state,
          showMintues: realTimeToShowMinutes(time),
          time
        };
      }
    }
  }

  return state;
};

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

const doTick = () => {
  store.dispatch(tick());
};

// Dispatch a tick action now and every 5 seconds
doTick();
setInterval(doTick, 5 * 1e3);
