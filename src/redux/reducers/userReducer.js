import {ActionTypes} from '../constants/action-types';

const initialState = {
    users:[]
  };

export const userReducer=(state=initialState, {type,payload})=>{

    switch(type){
        case ActionTypes.LIST_USER:
           console.log('reducer',payload)
 return { ...state, users:payload.data.allUsers};
           
        
       default:
         return state;
    }
}