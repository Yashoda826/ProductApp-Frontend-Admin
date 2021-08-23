import {useState, useReducer} from "react";
import{useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {listOfUsers} from '../redux/actions/index';
import axios from "axios";
import React, { useEffect } from "react";
import queryString from 'query-string';

import{useLocation} from "react-router-dom";
function Resetpassword(){
  const dispatch = useDispatch();
  const app = useSelector((appstate)=>appstate.user.users);
  console.log(app);

  const{search}  = useLocation();
  console.log(search);
  const{id,email} = queryString.parse(search);
  const[data,setpswrd]=useState({
  username:'' ,
  currentPassword:'',
newPassword:'',
_id:id
  })

    const frgtpswrduser = app.filter((user)=>
    {
      if(data._id==user._id){
    console.log(user);
return user;
  }


    });

 console.log(frgtpswrduser);

  const listUsers=async () => {
   
    const response1 = await axios.get('http://localhost:8089/api/v1.0.0/user/allUsers')
    .catch(
      (res)=>{
        console.log(res);
      }
  );
    
  console.log(response1);
    dispatch(listOfUsers(response1));
    }
  
  useEffect(()=>{listUsers()},[]);

      const updateState = (event)=>{
        setpswrd({...data,[event.target.name]:event.target.value});

    }

    const handleClick =(event)=>{
      event.preventDefault();
    
      
      data.username=frgtpswrduser[0].username;
      data.currentPassword=frgtpswrduser[0].password;
      setpswrd({...data});
      console.log(data);
      pswrdReset(data);
  }

  const pswrdReset =  async (data) => {
    console.log(data);
    const response = await axios.put("http://localhost:8089/api/v1.0.0/user/resetPassword",data)
      .catch((err) => {
        console.log("Err: ", err);
      });
      if(response!=undefined){
        alert(response.data.message);}
        
        else{
            alert('password update failed');
        }
      
   
  };
return(
    <>
  
    <div>
     
      <form>
            <br></br>
 <input type="password" name="newPassword" onChange={updateState} placeholder="NEW PASSWORD"></input><br></br><br></br>

<button onClick={handleClick}>Submit</button>   <br></br><br></br>
</form>
      
    </div>
    </>
)
}

export default Resetpassword;