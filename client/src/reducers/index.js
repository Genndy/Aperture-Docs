import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import pageReducer from "./pageReducer";
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer";
import conferenceReducer from "./conferenceReducer";
import sideReducer from "./sideReducer";


const rootReducer = combineReducers({
    user: userReducer,
    conference: conferenceReducer,
    page: pageReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer, 
    side: sideReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
