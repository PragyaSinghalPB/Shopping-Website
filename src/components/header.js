/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/style.scss';
import profileIcon from '../assets/images/profile.png';
import cartIcon from '../assets/images/cart.png';
import useModal from '../modals/useModal';
import { useSelector } from 'react-redux';
import ProfileModal from '../modals/profileModal';

function Header(props) {

    const navigate = useNavigate();

    const quantity = useSelector(state => state.cart.productArray.length);
    
    //Search items by title
    const searchItems = (e) => {
        let value = e.target.value;
        props.searchProductsByTitle(value);
    }

    //Filter product category
    // const handleCategoryChange = (category) => {
    // props.filteredData(category);
    // };

    //For particular path 
    const [isParticularLocation, setIsParticularLocation] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/checkout') { //detects the change in location/anything on particular function, we will use useEffect to add the additional change on particular function
            setIsParticularLocation(true);
        }
    }, [location]); //if we written an [](empty array) that means it reflects only on refresh/reload the page otherwise it use as depandancy array if anything change in this array reflects the condition that mentioned in it.

    //24*7 Customer care popup
    const openSupportAlert = () => {
        alert("Our support staff will reach out to you shortly. Thank you for your patience!!")
    }

    //Profile Modal
    const { isModalOpen, openModal, closeModal } = useModal();

    
    return (
        <>
            <header className="navbar navbar-dark navbar-expand-lg sticky-top bg-dark position-fixed w-100 flex-md-nowrap shadow">
                <div className="container-fluid">
                    <span className="navbar-brand" onClick={() => { navigate('/dashboard') }}>
                        Shoppers' Station
                    </span>
                    <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#headermenu" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id='headermenu'>
                        <ul className='navbar-nav align-items-center w-100'>
                            {!isParticularLocation &&
                                <>
                                    <li>
                                        <input className="form-control" type="text" placeholder="Search products..." onChange={(e) => (searchItems(e))} />
                                    </li>
                                    <li className='nav-item' id='home'>
                                        <a className='nav-link' href='/dashboard'>Home</a>
                                    </li>
                                    <li className='nav-item' id='orders'>
                                        <a className='nav-link' href='/myorders'>My Orders</a>
                                    </li>
                                    <li className='nav-item dropdown'>
                                        <span className="nav-link dropdown-toggle p-0" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src={profileIcon} className='sidebar-logo me-2' width={20} height={20} alt='user' />Pragya Singhal
                                        </span>
                                        <ul className="dropdown-menu mt-2">
                                            <li><span className="dropdown-item" onClick={() => openModal()}>Profile</span>
                                                {isModalOpen &&
                                                    <ProfileModal  
                                                       closeModal = {closeModal}
                                                    />
                                                }
                                            </li>
                                            <li><span className="dropdown-item" onClick={openSupportAlert}>24x7 Customer Care</span></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><span className="dropdown-item" onClick={() => { navigate('/'); }}>Logout</span></li>
                                        </ul>
                                    </li>
                                    <li className='nav-item cart' onClick={() => { navigate('/cart'); }}>
                                        <img src={cartIcon} alt='Cart' width={30} height={30} className='position-relative' />
                                        <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7em' }}>
                                            {quantity}
                                        </span>
                                    </li>
                                    <li className="nav-item text-nowrap">
                                        <button className="btn btn-outline-success px-3" onClick={() => { navigate('/'); }}>Log out</button>
                                    </li>
                                </>
                            }
                            {isParticularLocation &&
                                <li className="nav-item text-nowrap go-cart">
                                    <button className="btn btn-outline-success" onClick={() => { navigate('/cart') }}>
                                        Go to Cart  &nbsp;
                                        <img src={cartIcon} width={20} height={20} alt='Cart' />
                                    </button>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header;