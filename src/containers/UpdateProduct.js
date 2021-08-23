import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import React from "react";
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from "react";

 function UpdateProduct(props){
 
  const appc = useSelector((appstate)=>appstate.product.products);
  var p =JSON.parse(JSON.stringify(props.product))
  const [productdetails, setform] = useState(p
    // _id:props.product._id,
    // images:[props.product.images],
    // name:props.product.name,
    // description:props.product.description,
    // richDescription:props.product.richDescription,
    // image:props.product.image,
    // brand:props.product.brand,
    // price:props.product.price,
    // category:props.product.category,
    // countInStock: "2"
    )


  var v = '#'+props.product._id;
  console.log(p);
  console.log(props.product);
  console.log(productdetails);
  useEffect(()=>{updateState()},[props.product])



  const updateState=(event)=>{
   setform(p);
   console.log(productdetails, 'state in updatestate');
   console.log(props.product, 'props product in update state');
      
    }

  const updatingProducts= async ()=>{
      console.log(productdetails);
      console.log(props.product);
       
        const url1 = 'http://localhost:8089/api/v1.0.0/product/' + productdetails._id
                const apiResponse = await axios.put(url1, productdetails)
        .catch(
          (res)=>{
            console.log(res);
          }
        );
        
        console.log(apiResponse, 'update');
        if(apiResponse!=undefined){
        alert(apiResponse.data.message)}
        
        else{
            alert('product is not update')
        }
        props.lop();
        // console.log(props.product.images);
       
            }

  const updateProduct=(event)=>{
   
    // for (let key of Object.keys(props.product)){
      console.log(productdetails , 'in update product functn, initially');
    //   if(key===event.target.name){
        setform({...productdetails,[event.target.name]:event.target.value});
        console.log(productdetails , 'in update product functn');
        // props.product[key]=event.target.value;
        // console.log(props.product[key]);
        // event.target.value = props.product[key];
        // console.log(event.target.value);
      
    }
    
    
    return(
      <div>
      <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target={'#'+productdetails._id}>Update</button>
      <div class="modal fade" id={productdetails._id} role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">

   
        Images : <input type='text' name='images' value={productdetails.images} onChange={updateProduct}></input><br></br><br></br>
        Name : <input type='text' name='name'  value={productdetails.name} onChange={updateProduct}></input><br></br><br></br>
        Description : <input type='text' name='description' value={productdetails.description} onChange={updateProduct}></input><br></br><br></br>
        RichDescription : <input type='text' name='richDescription' value={productdetails.richDescription} onChange={updateProduct}></input><br></br><br></br>
        image : <input type='text' name='image' value={productdetails.image} onChange={updateProduct}></input><br></br><br></br>
        Brand : <input type='text' name='brand' value={productdetails.brand} onChange={updateProduct}></input><br></br><br></br>
        Price : <input type='text' name='price' value={productdetails.price} onChange={updateProduct}></input><br></br><br></br>
        CountInStock : <input type='text' name='countInStock' value={productdetails.countInStock} onChange={updateProduct}></input><br></br><br></br>
   
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onClick={updatingProducts}>Update</button>
      </div>
    </div>
    
  </div>
</div>
</div>
    )
}

export default UpdateProduct;