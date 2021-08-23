import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import React from "react";
import {useDispatch,useSelector} from 'react-redux';

 function UpdateCategories(props){
  
  const appc = useSelector((appstate)=>appstate.category.categories);
  var c =JSON.parse(JSON.stringify(props.category))
  const [categorydetails, setform] = useState(c)

  var v = '#'+props.category._id;

  useEffect(()=>{updateState()},[props.category])



  const updateState=(event)=>{
   setform(c);  
    }


  const updatingCategory= async ()=>{
    
    
        const url1 = 'http://localhost:8089/api/v1.0.0/category/' + categorydetails._id
                const apiResponse = await axios.put(url1, categorydetails)
        .catch(
          (res)=>{
            console.log(res);
          }
        );
        
        console.log(apiResponse, 'update');
        if(apiResponse!=undefined){
        alert(apiResponse.data.message)}
        
        else{
            alert('category is not update')
        }
        props.lc();
            }

  const updateCategory=(event)=>{
   console.log('update category');
   setform({...categorydetails,[event.target.name]:event.target.value});
    
  }


    return(
      <div>
      <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target={'#'+categorydetails._id}>Update</button>
      <div class="modal fade" id={categorydetails._id} role="dialog">
        <div class="modal-dialog">
        
          
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">

        Name : <input type='text' name='name' value={categorydetails.name} onChange={updateCategory}></input><br></br><br></br>
        Color : <input type='text' name='color' value={categorydetails.color} onChange={updateCategory}></input><br></br><br></br>
        Icon : <input type='text' name='icon' value={categorydetails.icon} onChange={updateCategory}></input><br></br><br></br>
        Image : <input type='text' name='image' value={categorydetails.image} onChange={updateCategory}></input><br></br><br></br>
    
   
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onClick={updatingCategory}>Update</button>
      </div>
    </div>
    
  </div>
</div>
</div>
    )
}

export default UpdateCategories;