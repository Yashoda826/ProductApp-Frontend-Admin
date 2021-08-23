import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {useState, useReducer} from "react";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Select from 'react-select';
import React from 'react';
 
function AddProduct(props){
  const app = useSelector((appstate)=>appstate.category.categories);
  const app1 = useSelector((appstate)=>appstate.product.products);
  console.log(app);
const [productdetails, setform] = useState({
    images:[],
    name:"",
    description:"",
    richDescription:"",
    image:"",
    brand:"",
    price:"",
    category: "",
    countInStock: ""

    })


 const updateState = (event)=>{
        setform({...productdetails,[event.target.name]:event.target.value});

    }

    // setform({category:options.value});

    const addingProducts= async (event)=>{
console.log(productdetails, 'add product');
        const apiResponse = await axios.post('http://localhost:8089/api/v1.0.0/product/add', productdetails)
.catch(
  (res)=>{
    console.log(res);
  }
);

console.log(apiResponse);
if(apiResponse!=undefined){
alert(apiResponse.data.message);


}

else{
    alert('product is not added');
   
}
props.pl();
props.productsDisplay(app1);

    }

    const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

const handleClose = () => setShow(false);

const handleReset = () => {
  const v = document.getElementsByClassName("Addinput");
  console.log(v);
 for(let i =0;i<v.length;i++){
   v[i].value="";
 }

};

        const selectOptn  =()  =>{
          // const ov = document.getElementsByClassName("category");
          console.log(app, 'select options');
          if(app.length!=0){
            console.log(app, 'select options in if loop');
            var ch = app.map((val) => {
              return (
                React.createElement("option", {id: val["key"],value:val["_id"]}, val["name"])
              )
            })

        }
        return ch;
      }// $('#select1').append(`<option value="${optionValue}">
            //                            ${optionText}
            //                       </option>`);

            let options = [];
app.map(item =>
  options.push({ label: app.name, value: app._id }),
);

return (
  <>
  <button type="button"  class="btn btn-info btn-lg" data-toggle="modal" data-target="#AP" onClick={handleReset}>Add Product</button>
  <div class="modal fade" id="AP" role="dialog">
    <div class="modal-dialog">
    
      
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          {/* <h4 class="modal-title">Modal Header</h4> */}
        </div>
        <div class="modal-body">
          <form id="Addform">
          Images : <input className="Addinput" type='text' name='images' onChange={updateState}></input><br></br><br></br>
          Name : <input className="Addinput" type='text' name='name' onChange={updateState}></input><br></br><br></br>
          Description : <input className="Addinput" type='text' name='description' onChange={updateState}></input><br></br><br></br>
          RichDescription : <input className="Addinput" type='text' name='richDescription' onChange={updateState}></input><br></br><br></br>
          image : <input className="Addinput" type='text' name='image' onChange={updateState}></input><br></br><br></br>
          Brand : <input className="Addinput" type='text' name='brand' onChange={updateState}></input><br></br><br></br>
<label>Category
<select name="category" className="category" onChange={updateState}>
  <option>select category</option>
  {/* <option value="60deec75db943a1260242406">Mobile</option>
  <option value="60deedefdb943a1260242411">Sports</option>
  <option value="60deee26db943a1260242412">Jewellery</option>  */}
  {selectOptn()}
</select>
</label>

  <br></br>
  
          Price : <input className="Addinput" type='text' name='price' onChange={updateState}></input><br></br><br></br>
          CountInStock : <input className="Addinput" type='text' name='countInStock' onChange={updateState}></input><br></br><br></br>
        </form>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onClick={addingProducts}>Add</button>
      </div>
    </div>
    
  </div>
</div>
  </>
);
}

export default AddProduct;