import { createStore, Reducer, Action, ActionCreator } from "redux";

export interface State {
  foo: string;
}
const empty: State = {
  foo: "bar"
};

const TICK = "TICK";
interface TickAction extends Action<typeof TICK> {
  payload: {
    foo: string;
  };
}
const tick: ActionCreator<TickAction> = () => {
  return {
    type: TICK,
    payload: {
      foo: "baz"
    }
  };
};

type Actions = TickAction;

const reducer: Reducer<State, Actions> = (state = empty, action) => {
  switch (action.type) {
    case TICK: {
      return {
        foo: action.payload.foo
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
