/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import ProductModal from '../modals/productModal';
// import NoteContext from '../context/noteContext';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';

function Dataproduct(props) {

    //product description with read-more 
    const truncatedDescription = props.description.length > 150 ? //variable define with condition
        `${props.description.slice(0, 150)}` : props.description;

    //add modal for read-more content
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Open Modal
    const openModal = () => {
        setIsModalOpen(true);
    }

    //Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
    }

    //Add products in cart page using useContext:

    // const {setCart} = useContext(NoteContext);

    // const addProductToCart = (product)=>{
    //     setCart((prevCart) => {
    //         return({
    //         ...prevCart, productArray: [...prevCart.productArray, product]
    //       })});
    //       navigate('/cart')
    //     }     

    //Add products in cart page using Redux:
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeCart, setActiveCart] = useState(false);
    const [viewCart, setViewCart] = useState(false);

    //show viewcart-btn on page-load
    const cartItems = useSelector((state) => state.cart.productArray);

    useEffect(() => { //useeffect at the time of data show on page reloading and clear at the time of cookies clear
        const viewCartItem = cartItems.find(item => item.id === props.id); //find method used to find an object
        setViewCart(viewCartItem?.id === props.id);
        setActiveCart(viewCartItem?.id === props.id);
    }, []);

    //On Click Add-to-cart button: 
    const addToCart = (product) => {
        dispatch(cartActions.addToCart({ product }));
        setActiveCart(true);
        setViewCart(true);
    }

    return (
        <>
            {isModalOpen &&
                <ProductModal
                    description={props.description}
                    productImg={props.img}
                    prodcutTitle={props.title}
                    productPrice={props.price}
                    closeModal={closeModal}
                />
            }

            <div class="card border-0">
                <div class="card-body p-0">
                    <figure className='mb-2 m-auto d-flex align-items-center'>
                        <img src={props.img} alt={props.alt} />
                    </figure>
                    <h5 class="card-title"><b>{props.title}</b></h5>
                    <span className='price'><em className='ruppee-icon'>₹</em>{Number(props.price).toFixed(2)}</span>
                    {/* <p class="card-text d-inline">{props.description.slice(0, 100)}....</p> */}
                    <div className='description'>
                        <p class="card-text">
                            {truncatedDescription}
                            {props.description.length > 150 && (
                                <a className='card-link d-block' onClick={openModal}>...Read More</a>
                            )}
                        </p>

                    </div>
                    <div className='d-flex cart-buttons'>
                        <button className={activeCart ? 'add-cart-btn btn btn-success' : 'add-cart-btn btn btn-primary'} onClick={() => addToCart(props)} >Add to cart</button>
                        <button className={viewCart ? 'add-cart-btn view-cart btn btn-warning' : 'd-none'} onClick={() => navigate('/cart')}>View Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dataproduct;