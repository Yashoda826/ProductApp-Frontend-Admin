import {useState, useReducer,useEffect} from "react";
import {NavLink} from 'react-router-dom';

function Cartdetails(props){
    // const v = JSON.parse(localStorage.getItem('itemStored'));
    var orderedItems = JSON.parse(localStorage.getItem('itemOrdered')) || [];
    const [orderdetails, setorder] = useState(orderedItems.length);
 
    const [v, setv] = useState((JSON.parse(localStorage.getItem('itemStored')))|| []);
    const [show, setShow] = useState(false);
    var [counter, setCounter] = useState(1);
    useEffect(() => {
       cartDisplay();
    //    console.log(document.getElementById("input").value);
      },[]);

    console.log(v,'localstorage');

    const cartDisplay=()=>{
          var u = v.map((product,key)=>{

            // var p =JSON.parse(JSON.stringify(product.price))
            const incrementCounter = (event) => {
                console.log(document.getElementById("input").value);
                if(product.countInStock<=1){
                   
        
                        event.target.previousSibling.value=1;
                        alert('out of stock');
                        setShow(!show);

                    
                }

                else{
                let val = event.target.previousSibling.value;
                val=parseInt(val)+1;
             product.count=val;
            
                event.target.previousSibling.value=val;
              product.countInStock=product.countInStock-1;
              console.log(product.countInStock);
              localStorage.setItem('itemStored', JSON.stringify(v));
             
              setShow(!show);
              
            }
            };
        
            let decrementCounter = (event) => {
                var value = event.target.nextSibling.value;
                console.log(value);
                if(value<2){
        
                    event.target.nextSibling.value=1;
                    alert('min cart product should be 1');
                }
    
        else{

    //         if(product.countInStock<1){
    //             removeCart();
     
            
    //          alert('out of stock');
    //          setShow(!show);

         
    //  }
    
                value=value-1;
                console.log(value);
                product.count=value;
              
                event.target.nextSibling.value=value;
                product.countInStock=product.countInStock+1;
              console.log(product.countInStock);
              localStorage.setItem('itemStored', JSON.stringify(v));
              
              setShow(!show);
             
            
            }
            }    // setCounter(counter - 1)
            ;
        console.log(key,'vkey',v[key].countInStock,v);
       
        
        const removeCart = ()=>{
     
         v.splice(key,1);
         localStorage.setItem('itemStored', JSON.stringify(v));
         var c =JSON.parse(JSON.stringify(v));
        setv(c);
        
        console.log(v,'verifying v after removing');

    }
    const placeOrder =(event)=>{
       
        if(product.countInStock<1){
                //    removeCart();
        
               
                alert('out of stock');
                // setShow(!show);

            
        }
        
       
        else{
        alert('Placed order');
        product.cancel=0;
orderedItems.push(product);

        localStorage.setItem('itemOrdered', JSON.stringify(orderedItems));
        product.countInStock=product.countInStock-1;
        console.log(product.countInStock);
        product.count = 1;
        localStorage.setItem('itemStored', JSON.stringify(v));
        
        setShow(!show); 
        setorder(JSON.parse(localStorage.getItem('itemOrdered')).length);}
        
    // event.target.innerHTML='Ordered';
    }

return  <tr>
        <td>{product.name}</td>
    <td>{v[key].countInStock}</td>
    
        
   
    <td><div>
    <button id={product._id} onClick={decrementCounter}>-</button>
    <input id="input" value={product.count} type="text"></input>
    <button id={product._id} onClick={incrementCounter}>+</button>
    </div></td>
    <td>{product.price}</td>
    <td>{product.price*product.count}</td>
    <td><button id={product._id} onClick={placeOrder}>PlaceOrder</button>  </td>
    <button onClick={removeCart}>Remove from cart</button>
    </tr>
   
          })
          console.log(u);
          return u;
            }





    return(
        <>
       
       <div style={{position:"relative",float:"right"}}>  
<h1>{orderdetails}</h1>
<NavLink style={{float:"right"}} className="nav-link" to="/orders"><img  style={{width:"100px"}}src="https://icon-library.com/images/order-icon-png/order-icon-png-16.jpg">
</img></NavLink>
</div>



       
       
       
       <table style={{width:"100%"}}>
           <tr>
               <th>PRODUCT</th>   
               <th>CountInStock</th>
           <th>Quantity</th>
           <th>Price</th>
           <th>TotalPrice</th>
           </tr>
           {v!=null ?  cartDisplay() : null }
        {/* {cartDisplay()} */}
        
        </table>
        
    </>
    )
}

export default Cartdetails;