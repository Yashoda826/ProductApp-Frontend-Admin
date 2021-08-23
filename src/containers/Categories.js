import {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import {listOfCategories} from '../redux/actions/index';
import UpdateCategories from './UpdateCategories';

function Categories(props){
    const dispatch = useDispatch();
    const app = useSelector((appstate)=>appstate.category.categories);
console.log(app);
const [categorydetails, setform] = useState({
    name:"",
    color:"",
    icon:"",
    image:""
  })

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

useEffect(()=>{listCategories()},[])

const updateState = (event)=>{
  setform({...categorydetails,[event.target.name]:event.target.value});

}

        const addingCategories= async (event)=>{
console.log(categorydetails, 'add category');
        const apiResponse = await axios.post('http://localhost:8089/api/v1.0.0/category/add', categorydetails)
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
    alert('Category is not added');
   
}
listCategories();
categoriessDisplay(app);
// props.cl();
    }

    const handleReset = () => {
  const v = document.getElementsByClassName("Addinput");
  console.log(v);
 for(let i =0;i<v.length;i++){
   v[i].value="";
 }

};


const categoriessDisplay=(items)=>{
  console.log(items,'items in category');
    var u = items.map((category)=>{
    const deletingCategory = async () =>{
        const url = 'http://localhost:8089/api/v1.0.0/category/' + category._id
        const delres = await axios.delete(url)
  .catch(
    (res)=>{
      console.log(res);
    }
  );
  console.log(delres);
if(delres!=undefined){
alert(delres.data.message);
}

else{
    alert('Category is not deleted');
   
}
listCategories();
categoriessDisplay(app);
    }

  return <div className="col"><div className="card">
<div class="card-body">
  <h2>{category.name}</h2>
  <img src={category.icon}></img>
  <UpdateCategories category={category} lc={listCategories} cd ={categoriessDisplay}></UpdateCategories>
        <button className="btn" onClick={deletingCategory}>DELETE</button>
      </div>
      </div>
      </div>
    })
    console.log(u);
    return u;
      }


return(
 <>
 <center><br></br><br></br>
  <button type="button"  class="btn btn-info btn-lg" data-toggle="modal" data-target="#AC" onClick={handleReset}>Add Category</button>
  <div class="modal fade" id="AC" role="dialog">
    <div class="modal-dialog">
    
      
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          {/* <h4 class="modal-title">Modal Header</h4> */}
        </div>
        <div class="modal-body">
          <form id="Addform">
          Name : <input className="Addinput" type='text' name='name' onChange={updateState}></input><br></br><br></br>
          Color : <input className="Addinput" type='text' name='color' onChange={updateState}></input><br></br><br></br>
          Icon : <input className="Addinput" type='text' name='icon' onChange={updateState}></input><br></br><br></br>
          Image : <input className="Addinput" type='text' name='image' onChange={updateState}></input><br></br><br></br>
        </form>
          </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" onClick={addingCategories}>Add</button>
      </div>
    </div>
    
  </div>
</div> <br></br><br></br>
<div className="row row-cols-1 row-cols-md-4 g-4" >
{categoriessDisplay(app)}
</div>
</center>
  </>
)
}

export default Categories;