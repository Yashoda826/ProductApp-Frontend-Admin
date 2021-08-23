import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';


function SearchBar(props){
  var [show, setShow] = useState([]);
var handleShow=(v)=>setShow(show=v);

    const app = useSelector((appstate)=>appstate.product.products);
    

const search =(event)=>{

        var v = app.filter(value => {
          var str = value.name.toString().toLowerCase();
          var targetstr = event.target.value.toString().toLowerCase();
          console.log(event.target.value, 'search value');

      if(event.target.value!=""){
        if(str.includes(targetstr)){
            return value;
          }
      }
        })

handleShow(v);
console.log(show);
  
    }

return(
    <div>
    <label htmlFor="search">Search product by name</label>
    
    <input type="text" onChange={search}></input>
    
    <div className="row row-cols-1 row-cols-md-4 g-4" >
    {show.length!=0 ?  props.searchlist(show) : null }
      </div>
 
     </div>
)
}

export default SearchBar;