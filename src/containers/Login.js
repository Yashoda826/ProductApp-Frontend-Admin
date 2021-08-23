import {useState, useReducer} from "react";
import axios from "axios";
import {HashRouter, Route} from 'react-router-dom';
import Products from './Products';
import Resetpassword from "./Resetpassword";
import {useDispatch, useSelector} from 'react-redux';
import {listOfUsers,frgtPswrdUser} from '../redux/actions/index';
import React, { useEffect } from "react";


function Login(props){
  console.log(props,'props');
    const [form, setform] = useState({
        username:"",
        password:""
    })
    localStorage.clear();
    const dispatch = useDispatch();
    const app = useSelector((appstate)=>appstate.user.users);
    console.log(app);

    const [email, setpswrdreset] = useState("");
    const updatePswrd = (event)=>{
      
      setpswrdreset({...email,[event.target.name]:event.target.value});
   
  }

  console.log(email);
// const handleShow = () => setShow(true);
const submitReset =(event)=>{
  event.preventDefault();
  resetPassword(email);


}

const resetPassword =  async (data) => {
  const response = await axios.post("http://localhost:8089/api/v1.0.0/user/forgotPassword",data)
    .catch((err) => {
      console.log("Err: ", err);
    });
    console.log(response);
    if(response!=undefined){
      alert(response.data.message);
//   const frgtpswrduser =  app.filter((user)=>
//     {
//       if(data.email==user.email){
//     console.log(user);
//   return user;
// }
// }
//     );
//   console.log(frgtpswrduser);
//   dispatch(frgtPswrdUser(frgtpswrduser));
//   {props.handlePswrd(frgtpswrduser)};
    }
      
      else{
          alert('Incorrect email');
      }
    
 
};

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
        setform({...form,[event.target.name]:event.target.value});

    }

    const handleClick =(event)=>{
        event.preventDefault();
        console.log(form);
        loginUser(form);
      

    }
        

    const loginUser =  async (data) => {
        const response = await axios.post("http://localhost:8089/api/v1.0.0/user/login",data)
          .catch((err) => {
            console.log("Err: ", err);
          });
          if(response!=undefined){
            alert(response.data.message);
            if(response.data.message=="Login success!"){
              console.log('Login success!');
              {props.handleShow(true)};
              {props.history.push('/products')};
              {props.handleUser(form.username)};
              // setShow(true);
              // console.log(show);

            }
        
          
          }
            
            else{
                alert('Incorrect username or password');
            }
          
       
      };

  

    return(
     <>
        <br></br><br></br>
        <form>
            <br></br>
Enter Username: <input type="text" name="username" onChange={updateState}></input><br></br><br></br>
Enter Password: <input type="password" name="password" onChange={updateState}></input><br></br><br></br>
<button onClick={handleClick}>Login</button>   <br></br><br></br>

           {/* <a href='#'>Forgot password?</a><br></br> */}
           <button type="button"  class="btn btn-info btn-sm" data-toggle="modal" data-target="#FP">Forgot Password</button>
  <div class="modal fade" id="FP" role="dialog">
    <div class="modal-dialog">
    
      
  <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <form>
          Enter email address : <input type='text' name='email' onChange={updatePswrd}></input><br></br><br></br>
        </form>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onClick={submitReset}>Submit</button>
      </div>
    </div>
    
  </div>
</div>

OR<br></br><br></br>

<button onClick>Request OTP</button> <br></br><br></br>
        </form>

 </>
    )
}

export default Login;