import { combineReducers } from "redux";
import timer from "./timer";

const rootReducer = combineReducers({
  timer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;