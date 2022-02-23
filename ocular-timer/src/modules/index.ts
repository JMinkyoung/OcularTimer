import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import timer from "./timer";
import mode from "./mode";

const persisConfig = {
  key: "root",
  storage,
  whitelist:["timer","mode"]
};
const rootReducer = combineReducers({
  timer,
  mode
});

export default persistReducer(persisConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;