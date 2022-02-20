import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import timer from "./timer";

const persisConfig = {
  key: "root",
  storage,
  whitelist:["timer"]
};
const rootReducer = combineReducers({
  timer
});

export default persistReducer(persisConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;