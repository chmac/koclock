import { createStore, Reducer, Action, ActionCreator } from "redux";

const NUMBER_OF_MISSING_K_SECONDS = 60 - 42;
const NUMBER_OF_K_TIME_MINUTES_PER_BLOCK = 4;

const TICK = "TICK";
interface TickAction extends Action<typeof TICK> {
  payload: {
    nowSeconds: number;
  };
}
const tick: ActionCreator<TickAction> = () => {
  return {
    type: TICK,
    payload: {
      nowSeconds: 18
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
  numberOfSecondsAddedToMake42Equal60: number;
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
  return Math.floor(kTime.kTimeSeconds / 60);
};

const advanceKTime = (time: KTime, action: TickAction): State => {
  const newTime = {
    ...time,
    numberOfSecondsAddedToMake42Equal60:
      time.numberOfSecondsAddedToMake42Equal60 + NUMBER_OF_MISSING_K_SECONDS
  };

  return {
    showMintues: kTimeToShowMinutes(newTime),
    time: newTime
  };
};

const reducer: Reducer<State, Actions> = (state = empty, action) => {
  switch (action.type) {
    case TICK: {
      if (state.time) {
        // Is the current displayed time still valid?
        switch (state.time.type) {
          case REAL_TIME: {
            if (realTimeToShowMinutes(state.time) === state.showMintues) {
              return state;
            }
            break;
          }
          case K_TIME: {
            if (kTimeToShowMinutes(state.time) === state.showMintues) {
              return state;
            }

            // kTime is not current, but not yet advanced enough blocks
            if (
              state.time.numberOfSecondsAddedToMake42Equal60 <
              NUMBER_OF_K_TIME_MINUTES_PER_BLOCK * NUMBER_OF_MISSING_K_SECONDS
            ) {
              return {
                ...state,
                ...advanceKTime(state.time, action)
              };
            }
            break;
          }
        }

        // Based on the dice roll, choose either kTime or realTime
      }

      return {
        ...state,
        showMintues: 12,
        time: {
          type: K_TIME,
          kTimeSeconds: 0,
          numberOfSecondsAddedToMake42Equal60: 0
        }
      };
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
