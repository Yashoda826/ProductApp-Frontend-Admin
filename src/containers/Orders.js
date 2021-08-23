

import {useState, useReducer} from "react";
function Orders(props){
    var orderedItems = JSON.parse(localStorage.getItem('itemOrdered')) || [];
    var storedItems = JSON.parse(localStorage.getItem('itemStored')) || [];
    // var cancelledItems = JSON.parse(localStorage.getItem('itemCancelled')) || [];
    const [v, setv] = useState((JSON.parse(localStorage.getItem('itemOrdered')))|| []);
    const [s, sets] = useState((JSON.parse(localStorage.getItem('itemStored')))|| []);
    
    const orderDisplay=()=>{
        var u = v.map((product,key)=>{

            const cancelOrder=(event)=>{
                  event.target.innerHTML='Order cancelled';
                  event.target.style.color="red";
                  product.cancel=1;
                localStorage.setItem('itemOrdered', JSON.stringify(v));
                for(var i=0;i<=s.length;i++){
                    console.log(s[i]);  
                    if(s[i]!=undefined){
if(s[i]._id==product._id){
s[i].countInStock=parseInt(s[i].countInStock)+parseInt(product.count);
localStorage.setItem('itemStored', JSON.stringify(s));
}
                       }       

}
            //    var c= s.map(item=>{if(item.id==product.id)
            //     console.log(item[0].coutInStock);
            //         return item;

            //     }
               
            //     )

            //     console.log(c);

                //   cancelledItems.push(product);
                //   localStorage.setItem('itemCancelled', JSON.stringify(cancelledItems));
                
            }
            return  <tr>
        <td>{product.name}</td>
    <td>{product.count}</td>
    <td>{product.price}</td>
    <td>{product.price*product.count}</td>
    <td><button>Order status</button></td>
    {product.cancel==0 ?  <td><button id={product._id} onClick={cancelOrder}>Cancel Order</button></td> : <td style={{color:"red"}}><button id={product._id} >Order cancelled</button></td> }
    
    
  
    </tr>
   
          })
          console.log(u);
          return u;
            }
return(
    <>
     <table style={{width:"100%"}}>
           <tr>
               <th>PRODUCT</th>   
               <th>Count</th>
           <th>Individual Product Price</th>
           <th>TotalPrice</th>
           </tr>
           {v!=null ?  orderDisplay() : null }
        {/* {cartDisplay()} */}
        
        </table>
    </>
)
}

export default Orders;