import axios from "axios";
import React from "react";
import {useState, useReducer} from "react";
import {useDispatch} from 'react-redux';
import {userRegistration} from '../redux/actions/index';
import {useForm} from "react-hook-form";
import {useFormik} from "formik";
import * as Yup from 'yup';


function Register(){
 
const initialValues = {
  username:"",
  password:"",
  email:""
}

const onSubmit = values=>{registerUser(values);}
// const validate = values=>{
//   let errors={}
// if(!values.username){
// errors.username="Required"
// }
// if(!values.password){
// errors.password="Required"
// }

// if(!values.email){
// errors.email="Required"
// }
// else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email)){
//   errors.email="email is not in correct format"
// }
//   return errors;
// }

const validationSchema = Yup.object({
  username:Yup.string().required('Required!'),
  password:Yup.string().required('Required!').min(5,'min 5 char required!'),
  email:Yup.string().email('Invalid email format').required('Requied!')
})

const formik = useFormik(
  {
    initialValues,
    onSubmit,
    // validate
    validationSchema
  }
  
  );
console.log('formik onblur', formik.touched);

    const handleReset = () => {
      const v = document.getElementsByTagName("input");
      console.log(v);
     for(let i =0;i<v.length;i++){
       v[i].value="";
     }
    
    };
    

const dispatch = useDispatch();

const registerUser =  async (data) => {
    const response = await axios.post("http://localhost:8089/api/v1.0.0/user/register",data)
      .catch((err) => {
        console.log("Err: ", err);
      });
      if(response!=undefined){
        alert(response.data.message);
        dispatch(userRegistration(response.data));
        handleReset();
      
      }
        
        else{
            alert('Not Registered')
        }
      
   
  };



   
    return(
        <React.Fragment>
            <br></br><br></br>
            <form onSubmit={formik.handleSubmit}>
                <br></br>
Enter Username: <input type="text" name="username" {...formik.getFieldProps('username')}></input>
{formik.touched.username&&formik.errors.username?<div style={{color:"red"}}>{formik.errors.username}</div>:null}
<br></br><br></br>
Enter Password: <input type="password" name="password" {...formik.getFieldProps('password')}></input>
{formik.touched.password&&formik.errors.password?<div style={{color:"red"}}>{formik.errors.password}</div>:null}
<br></br><br></br>
Enter Email: <input type="email" name="email" {...formik.getFieldProps('email')}></input>
{formik.touched.email&&formik.errors.email?<div style={{color:"red"}}>{formik.errors.email}</div>:null}
<br></br><br></br>
{/* <button onClick={handleClick}>Register</button> */}
<button>Register</button>
            </form>
    
     </React.Fragment>
    )
}

export default Register;