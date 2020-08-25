import { createStore,applyMiddleware} from 'redux'
import profileReducer  from './ProfileReducer'
// import thunk from "redux-thunk";

export const store = createStore(profileReducer);