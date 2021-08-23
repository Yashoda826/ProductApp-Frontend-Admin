import axios from "axios";
import React, { useEffect } from "react";
import {useState, useReducer} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {listOfUsers} from '../redux/actions/index'


function UserList(){
    
 const app = useSelector((appstate)=>appstate.user.users);
 console.log(app);

 const dispatch = useDispatch();
  const listUsers=async () => {
  
  const response = await axios.get('http://localhost:8089/api/v1.0.0/user/allUsers')
  .catch(
    (res)=>{
      console.log(res);
    }
);
  
console.log(response);
  dispatch(listOfUsers(response));
  }
   
  useEffect(()=>{listUsers()},[]);

  const usersDisplay=()=>{
var u = app.map((users)=>{
  return <li key={users._id}>{users.username}<input type="checkbox" value={users._id}onClick={handleAdmin}></input></li>
})
return u;
  }


  const handleAdmin= async (event)=>{
    const id = event.target.value;
    const isChecked=event.target.checked;
    console.log('checkbox is',event.target.checked);
    console.log('id',id);
    var requestObject= {
      // _id:"60d36da91b4261126803aa2e",
      _id:"60d416c90a4a3d07ac572a1f",
      target_id:id,
      isAdmin:isChecked
}
const apiResponse = await axios.patch('http://localhost:8089/api/v1.0.0/user/updateRole', requestObject)
.catch(
  (res)=>{
    console.log(res);
  }
);

console.log(apiResponse);
  }

  const adminUsers=()=>{
    var u = app.map((users)=>{
      if(users.isAdmin){
      return <li key={users._id}>{users.username}</li>
      }
    })
    console.log(u,'admin users');
    return u;
      }

    return(
        <div>
  
    
    <ul>
    {usersDisplay()}
    </ul>
    <h1>List of admin users</h1>
    {/* {adminUsers(app)}  */}

{adminUsers()}
    
    
     </div>
    )
}

export default UserList;