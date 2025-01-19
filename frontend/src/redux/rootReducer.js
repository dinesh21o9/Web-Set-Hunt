import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
export default combineReducers({
    loading:loaderReducer
});