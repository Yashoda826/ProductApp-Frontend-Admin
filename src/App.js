import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Header1 from './components/Header1';
import {HashRouter, Route,useParams,Switch,Link} from 'react-router-dom';
import UserList from './containers/UserList'
import Products from './containers/Products';
import AddProduct from './containers/AddProduct';
import Categories from './containers/Categories';
import Login from './containers/Login';
import Register from './containers/Register';

import {useState, useReducer,useEffect} from "react";
import Resetpassword from './containers/Resetpassword';
import Changepassword from './containers/Changepassword';
import { useLocation } from 'react-router-dom';
import Cartdetails from './containers/Cartdetails';
import Orders from './containers/Orders';


function App() {

  const [show, setShow] = useState(false);
  const [username, setUn] = useState('');
  localStorage.setItem('username', JSON.stringify(username));
  const[resetpswrd, setPswrd]=useState();
  console.log('resetpswrd state', resetpswrd);
  // var x = localStorage.getItem('token');
  const currentURL = window.location.href;
  console.log(currentURL);
  console.log(resetpswrd);
  // console.log(JSON.parse(x));
  // function Resetpassword1(){
  //   let {id} = useParams();
  //   return (
  //     <div>
  //       <h3>{id}</h3>
  //       <Resetpassword></Resetpassword>
  //     </div>
  //   );
  // }
  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }



  if(currentURL.match(`http://localhost:3000/#/resetpassword`)){
return(
  <HashRouter>
   
    <Route children={<Resetpassword/>}></Route>
    
    </HashRouter>

)
  }

//   if(currentURL.match(`http://localhost:3000/#/changePassword`)){
//     console.log("check");  
// return(

//  <HashRouter>
// {/* <Changepassword></Changepassword> */}
// <Route path="/changePassword" component={Changepassword}></Route>
// </HashRouter>
// )
//   }


{/* <Route path='/:handle'>
  <Resetpassword />
</Route>  */}

  if(!show){
  return (
    <div className="App">

      <HashRouter>
      {/* <Switch>
    <Route path="/resetpassword/:id" children={<Resetpassword1/>}></Route>
    </Switch> */}
    <Header></Header>
    
    <Route path="/users" component={UserList}></Route>
    <Route path="/login" render={(props)=><Login{...props} handleShow = {(sv)=>setShow(sv)} handleUser = {(sv)=>setUn(sv)} handlePswrd={(pd)=>setPswrd(pd)}></Login> }></Route>
    <Route path="/register" component={Register}></Route>
   
    </HashRouter>
    </div>
  )
  }
  else{
return(
  <HashRouter>
    <Header1></Header1>
    <h1>Logged in user {username}!</h1>
    
    {/* <Changepassword></Changepassword> */}
    <Route path="/changePassword" render={(props)=><Changepassword{...props} username = {username} handleShow = {(sv)=>setShow(sv)}></Changepassword> }></Route>
    <Route path="/cartDetails" render={(props)=><Cartdetails{...props} username = {username} handleShow = {(sv)=>setShow(sv)}></Cartdetails> }></Route>
    <Route path="/orders" render={(props)=><Orders{...props} username = {username} handleShow = {(sv)=>setShow(sv)}></Orders> }></Route>
    <Route path="/products" component={Products}></Route>
    <Route path="/categories" component={Categories}></Route>
   
    </HashRouter>
  // <div>
  //   <h1>Welcome admin user {username}!</h1>
  // <Products></Products>
  // <Categories></Categories>
  // </div>
    )
  } 

}

export default App;
