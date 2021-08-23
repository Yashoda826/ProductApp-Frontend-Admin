import React from 'react';
import {NavLink} from 'react-router-dom';


function Header1(){
    return(
      
        <React.Fragment>
          
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
 
  {/* <NavLink className="navbar-brand" to="#">Logo</NavLink> */}
  <NavLink className="navbar-brand" to="/products">Products</NavLink>
  
 
  <ul className="navbar-nav">
    {/* <li className="nav-item">
      <NavLink className="nav-link" to="/users">HandleAdmin</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/login">Login</NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to="/register">Register</NavLink>
    </li> */}
     
      
    
        <li className="nav-item">
      <NavLink className="nav-link" to="/categories">Categories</NavLink>
    </li> 
  
  </ul>
</nav>
<NavLink style={{float:"right"}} className="nav-link" to="/changePassword">ChangePassword</NavLink>


</React.Fragment>

    )
}

export default Header1;