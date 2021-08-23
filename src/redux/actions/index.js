import { ActionTypes } from "../constants/action-types";

export const userRegistration=(response)=>{
    console.log('response action', response);
    if(response.status){
        localStorage.setItem('token',response.token);
    }
    
        return{
            type:ActionTypes.REGISTER_USER,
            payload:response
        }
    }

export const listOfUsers=(response)=>{
console.log('response action', response);
// if(response.status){
//     localStorage.setItem('token',response.token);
// }

    return{
        type:ActionTypes.LIST_USER,
        payload:response
    }
}


export const frgtPswrdUser=(response)=>{
    console.log('response action in frgtpswrd', response);
    
        localStorage.setItem('token',JSON.stringify(response));
    
    
        return{
            type:ActionTypes.FRGTPSWRD_USER,
            payload:response
        }
    }

export const listOfProducts=(response)=>{
    console.log('response action in action item', response);
    // if(response.status){
    //     localStorage.setItem('token',response.token);
    // }
    
        return{
            type:ActionTypes.LIST_PRODUCTS,
            payload:response
        }
    }


    export const listOfCategories=(response)=>{
    console.log('response action category', response);
    
        return{
            type:ActionTypes.LIST_CATEGORIES,
            payload:response
        }
    }