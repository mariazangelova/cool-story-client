import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import homepages from "./home/reducer";
import homepage from "./pagedetails/reducer";

export default combineReducers({
  appState,
  user,
  homepages,
  homepage
});
