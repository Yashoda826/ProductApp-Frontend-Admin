import {ActionTypes} from '../constants/action-types';

const initialState = {
    categories:[]
  };

export const categoryReducer=(state=initialState, {type,payload})=>{

    switch(type){
        case ActionTypes.LIST_CATEGORIES:
           console.log('reducer in categoryreducer',payload)
 return { ...state, categories:payload.data.categories};
           
        
       default:
         return state;
    }
}