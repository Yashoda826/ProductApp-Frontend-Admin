import axios from "axios";
import React, { useEffect } from "react";
import {useState, useReducer} from "react";
import {ReactReduxContext, useDispatch, useSelector} from 'react-redux';
import {listOfProducts} from '../redux/actions/index';
import ModalDialog from "react-bootstrap/ModalDialog";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import UpdateProduct from "./UpdateProduct";
import shouldComponentUpdate from "react";
import SearchBar from "./SearchBar";
import AddProduct from "./AddProduct";
import Categories from "./Categories";
import {listOfCategories} from '../redux/actions/index';
import {NavLink} from 'react-router-dom';


function Products(props){
  const dispatch = useDispatch();
const v=[];
const app = useSelector((appstate)=>appstate.product.products);
const appc = useSelector((appstate)=>appstate.category.categories);

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
  var oldItems = JSON.parse(localStorage.getItem('itemStored')) || [];
  const [cartdetails, setcart] = useState(oldItems.length);
  var [counter, setCounter] = useState(1);
  // if (localStorage.getItem("itemStored")) {
  //   setcart(JSON.parse(localStorage.getItem('itemStored')).length);
  // }
  console.log("cartdetails",cartdetails);

  // var c =JSON.parse(JSON.stringify(cartdetails));
//   if (localStorage.getItem("itemStored")) {
//     var c=(JSON.parse(localStorage.getItem('itemStored')).length);
//  }

  const updateState = (event)=>{
    setform({...productdetails,[event.target.name]:event.target.value});

}

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

  listProducts();
productsDisplay(app);
  
      }

      const handleReset = () => {
        const v = document.getElementsByClassName("Addinput");
        console.log(v);
       for(let i =0;i<v.length;i++){
         v[i].value="";
       }
      
      };

      const selectOptn  =()  =>{

        if(appc.length!=0){
          var ch = appc.map((val) => {
            return (
              React.createElement("option", {id: val["key"],value:val["_id"]}, val["name"])
            )
          })

      }
      return ch;
    }

    let options = [];
    app.map(item =>
      options.push({ label: app.name, value: app._id }),
    );

const listProducts = async()=>{
  const productslist = await axios.get('http://localhost:8089/api/v1.0.0/product/list')
.catch(
  (res)=>{
    console.log(res);
  }
);

dispatch(listOfProducts(productslist));

}

const listCategories = async()=>{
    
  const categorieslist = await axios.get('http://localhost:8089/api/v1.0.0/category/list')
.catch(
  (res)=>{
    console.log(res);
  }
);

console.log(categorieslist);

dispatch(listOfCategories(categorieslist));

}

const [show, setShow] = useState(false);
const handleShow = () => setShow(!show);
const handleClose = () => setShow(false);

useEffect(()=>{listProducts()},[])
useEffect(()=>{listCategories()},[])


const productsDisplay=(items)=>{
console.log(items,'pdisplay');

  var u = items.map((product)=>{

const addtocartProduct = (event)=>{
  let filteredProduct = oldItems.filter(cls => product.name.includes(cls.name));
  if(filteredProduct.length!=0){
    alert('product is  already added to cart, go to cart to verify product');
  }
  

  else{
  // event.target.nextSibling.disabled=false;
  // event.target.disabled = true;
  console.log('add to cart product', product)
  console.log('existing items',oldItems);
  product.count = "1";
  // product.countInStock=product.countInStock-1;
  

  oldItems.push(product);
  localStorage.setItem('itemStored', JSON.stringify(oldItems));

  setcart(JSON.parse(localStorage.getItem('itemStored')).length);
  }
}

const gotocartProduct= () =>{
  console.log('go to cart');
  {props.history.push('/cartDetails')};
  // return <NavLink className="nav-link" to="/cartDetails"></NavLink>
}
  const deletingProducts = async () =>{
      const url = 'http://localhost:8089/api/v1.0.0/product/' + product._id
      const delres = await axios.delete(url)
// .catch(
//   (res)=>{
//     console.log(res);
//   }
// );
.then((response)=>{alert(response.data.message)})
listProducts();
productsDisplay(app);
  }



 const mouseenter =(event)=>{
      event.target.src=product.images[0];
       }
  
const mouseleave =(event)=>{
        event.target.src=product.images[1];
         }

return <div className="col"><div className="card">
   <img src={product.images[0]} className="card-img-top" style={{height:'500px'}} onMouseEnter={mouseenter} onMouseLeave={mouseleave}></img>
  <h3>{product.name}</h3>
     
    <div class="card-body">


  <UpdateProduct product={product} lop={listProducts} pd={productsDisplay}></UpdateProduct>
  
      <button className="btn" onClick={deletingProducts}>DELETE</button>
      <button className="btn" id={product._id} onClick={addtocartProduct}>Add to cart</button>
      <button className="btn" onClick={gotocartProduct}>Go to cart</button>
      
      
    </div>
    </div>
    </div>
  })
  console.log(u);
  return u;
    }


    return(
        <div>
  <br></br><br></br>

{/* <SearchBar></SearchBar> */}
<div style={{position:"relative",float:"right"}}>
<h1 style={{position:"absolute",marginTop:"70px",marginLeft:"150px"}}>{cartdetails}</h1>
<NavLink style={{float:"right"}} className="nav-link" to="/cartDetails"><img  src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=170667a&w=0&h=AWU8_gwiznsLQxCjVn-3wpABn4AHtTSNVgS_A9g4Fro=">


</img></NavLink>
{/* <img  src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=170667a&w=0&h=AWU8_gwiznsLQxCjVn-3wpABn4AHtTSNVgS_A9g4Fro=">


</img> */}

</div>
  <SearchBar searchlist = {(v)=>productsDisplay(v)}></SearchBar><br></br><br></br>
  {/* <Categories cl={listCategories}></Categories> <br></br><br></br> */}
  
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



<h1>All Products</h1><br></br><br></br>

<div className="row row-cols-1 row-cols-md-4 g-4" >
  {productsDisplay(app)}
   </div>
     </div>
    )

    }

export default Products;