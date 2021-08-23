import { combineReducers } from "redux";
import {userReducer} from '../reducers/userReducer';
import { productReducer } from "./productReducer";
import {categoryReducer} from "./categoryReducer";
import { userLoggedin } from "./userLoggedin";
import { frgtPswrdUser } from "./frgtPswrdUser";
const reducers = combineReducers({
  user: userReducer,
  product:productReducer,
  category:categoryReducer,
  registereduser: userLoggedin,
  frgtpswduser:frgtPswrdUser
});

console.log('root reducer');

export default reducers;