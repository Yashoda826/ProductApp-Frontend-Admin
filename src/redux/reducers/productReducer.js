import {ActionTypes} from '../constants/action-types';

const initialState = {
    products:[]
  };

export const productReducer=(state=initialState, {type,payload})=>{

    switch(type){
        case ActionTypes.LIST_PRODUCTS:
           console.log('reducer in productreducer',payload)
 return { ...state, products:payload.data.products};
           
        
       default:
         return state;
    }
}