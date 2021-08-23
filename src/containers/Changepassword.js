import { Link } from 'react-router-dom';
import {useState, useReducer,useEffect} from "react";
import axios from "axios";
import{useSelector} from 'react-redux';
import Login from './Login';

function Changepassword(props){
    const [form, setform] = useState({
        username:props.username,
        currentPassword:"",
        newPassword:""
    })

console.log(form);
const app = useSelector((appstate)=>appstate.user.users);
console.log(app);

const frgtpswrduser = app.filter((user)=>
{
  if(form.username==user.username){
console.log(user);
return user;
}

});


const updateState = (event)=>{
    setform({...form,[event.target.name]:event.target.value});

}

const chngPswrd = (event)=>{
event.preventDefault();
      console.log(frgtpswrduser);
// form._id=frgtpswrduser[0]._id;
// setform({...form});
pswrdChange(form);

}

const pswrdChange =  async (data) => {
    console.log(data);
    const response = await axios.put("http://localhost:8089/api/v1.0.0/user/changePassword",data)
      .catch((err) => {
        console.log("Err: ", err);
      });
      if(response!=undefined){
        alert(response.data.message);
        {props.handleShow(false)};
        {props.history.push('/login')};
    }
        
        else{
            alert('password update failed');
        }
      
   
  };



    return(
        <>
        <center>
        <input name="currentPassword" type="password" placeholder="Current password" onChange={updateState}></input><br></br><br></br>
        <input name="newPassword" type="password" placeholder="New password" onChange={updateState}></input><br></br><br></br>
        {/* <input type="password" placeholder="Re-enter New password"></input><br></br><br></br> */}
        <button onClick={chngPswrd}>Submit</button>
        </center>
</>
        
    )
}

export default Changepassword;