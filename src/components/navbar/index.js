import React from 'react'
import './index.css'


function NavBar() {
  return(
    <div className="navbar">
      <div className="navbar-container">
        <div className="nav-logo">YATL</div>
        <div className="nav-menu">
          <div className="nav-item" id="navbar-login"><a href="#">Login</a></div>
          <div className="nav-item" id="navbar-signup"><a href="#">Sign Up</a></div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;