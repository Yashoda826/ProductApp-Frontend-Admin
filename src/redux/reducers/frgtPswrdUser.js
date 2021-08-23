import {ActionTypes} from '../constants/action-types';

const initialState = {
    frgtpswrduser:""
  };

export const frgtPswrdUser=(state=initialState, {type,payload})=>{

    switch(type){
        case ActionTypes.FRGTPSWRD_USER:
           console.log('reducer in frgtpswrdreducer',payload)
 return { ...state, frgtpswrduser:payload};
           
        
       default:
         return state;
    }
}