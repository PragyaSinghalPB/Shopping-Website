/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import Header from './header';

import { useNavigate } from 'react-router-dom';

import profileIcon from '../assets/images/profile.png';
import cartIcon from '../assets/images/cart.png';

function Sidebar(props) {

  //onclick signout goes to login page
  const navigate = useNavigate();

  //add active class on navbar menu
  const [activeMenu, setActiveMenu] = useState('all');

  //Filter product category
  const handleCategoryChange = (category) => {
    props.filteredData(category);
    setActiveMenu(category);
  };

  return (
    <>
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
        <div className="position-sticky">
          <ul className="nav flex-column" id="sidebarMenu">
            <li className={activeMenu === 'all' ? 'nav-item active' : 'nav-item'} id='all' onClick={() => handleCategoryChange("all")}>
              All
            </li>
            <li className="nav-item dropdown desktop-menu" id='clothing'>
              <span className="dropdown-toggle">Clothing</span>
              <ul className="dropdown-menu">
                <li className={activeMenu === "men's clothing" ? 'nav-item active' : 'nav-item'} id='men-clothing' onClick={() => handleCategoryChange("men's clothing")}>
                  Men's
                </li>
                <li className={activeMenu === "women's clothing" ? 'nav-item active' : 'nav-item'} id='women-clothing' onClick={() => handleCategoryChange("women's clothing")}>
                  Women's
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown mobile-menu d-none" id='clothing'>
                <li className={activeMenu === "men's clothing" ? 'nav-item active' : 'nav-item'} id='men-clothing' onClick={() => handleCategoryChange("men's clothing")}>
                  Men's
                </li>
                <li className={activeMenu === "women's clothing" ? 'nav-item active' : 'nav-item'} id='women-clothing' onClick={() => handleCategoryChange("women's clothing")}>
                  Women's
                </li>
            </li>
            <li className={activeMenu === "jewelery" ? 'nav-item active' : 'nav-item'} id='jewellery' onClick={() => handleCategoryChange("jewelery")}>
              Jewellery
            </li>
            <li className={activeMenu === "electronics" ? 'nav-item active' : 'nav-item'} id='electronics' onClick={() => handleCategoryChange("electronics")}>
              Electronics
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Sidebar;