import {createStore, applyMiddleware} from "redux";
import {composeWithDevToools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(rootReducer,composeWithDevToools(applyMiddleware(thunk)));