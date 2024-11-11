/* eslint-disable jsx-a11y/alt-text */
import React, { useState , useEffect, useRef} from 'react';
import DataTable from 'react-data-table-component';
// import NoteContext from '../context/noteContext';
import Header from './header';
import removeItem from '../assets/images/bin.png';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/reducers/cartSlice';
import { useNavigate } from 'react-router-dom'; 
import useModal from '../modals/useModal';

export default function Cart() {

  const cartItems = useSelector((state) => state.cart.productArray); //useSlector use to fetch the current data from redux
  const dispatch = useDispatch();

  //update cartitems quantity and reflect also
  useEffect(()=>{
    setSearchCartItems(cartItems);

    calculateSubTotalAmt(); //for subtotal amount

  },[cartItems]);


  //Search cartitems
  const [searchCartItems, setSearchCartItems] = useState(cartItems);

  //Quantity increase/decrease quantity on click +/-: 
  const addProductQuantity = (product) => {
    dispatch(cartActions.addToCart({ product }))
  };

  const removeProductQuantity = (id) => {
    dispatch(cartActions.removeFromCart(id))
  };

  //Delete particular item onClick:
  const removeProductItem = (id) => {
    dispatch(cartActions.removeProductItem(id));
  }

  //Empty/Clear cart items:
  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  }

  //Search product through title
  const searchProductsByTitle = (value) => {
    const searchItems = cartItems.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    setSearchCartItems(searchItems);
  };

  const columns = [

    {
      name: 'Item',
      selector: row => <p className='py-2 m-0'><img src={row.img} alt={row.alt} width={50} height={50} /></p>
    },

    {
      name: 'Name',
      selector: row => row.title,
    },

    {
      name: 'Price',
      selector: row => <span><em className='ruppee-icon'>₹</em>{Number(row.price).toFixed(2)}</span>
    },

    {
      name: 'Quantity',
      selector: row =>
        <>
          <button className='btn btn-success cart-actions' onClick={() => addProductQuantity(row)}>+</button>
          <span className='px-2'>{row.quantity}</span>
          <button className='btn btn-danger cart-actions' onClick={() => removeProductQuantity(row.id)}>-</button>
        </>
    },

    {
      name: 'Total Amount',
      selector: row => <span><em className='ruppee-icon'>₹</em>{Number(row.totalPrice).toFixed(2)}</span>
    },

    {
      name: 'Remove Items',
      selector: row => <img src={removeItem} alt='img' width={20} height={20} onClick={() => removeProductItem(row.id)} />

    }

  ]
  // const { cart } = useContext(NoteContext);

  // console.log(cart.productArray)

  //Increase Product Quantity
  // const addProductQuantity = () => {
  //   if(quantity < 10){
  //     setQuantity(quantity + 1);
  //   }
  // }

  // //Decrease Product Quantity
  // const removeProductQuantity = () => {
  //   if(quantity > 0){
  //     setQuantity(quantity - 1);
  //   }
  // }

  //Proceed to Modal open
  const { isModalOpen, openModal, closeModal} = useModal();

  const modalRef = useRef();

  //Calculate total amount of all products that mentioned in proceed-to-buy modal:
  const[subTotalAmt, setsubTotalAmt] = useState(0);

  const calculateSubTotalAmt = () => {
    let totalAmount = cartItems.reduce((sum, product) => {
      // return sum + Number(product.price) * (product.quantity);
      return sum + Number(product.totalPrice);
    }, 0);
    setsubTotalAmt(totalAmount.toFixed(2));
  } 

  //Navigate to checkout page
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(cartActions.addCheckoutItems({items: cartItems, total: subTotalAmt}));
    navigate('/checkout');
  }


  return (
    <div className='cart-inner'>
      <Header searchProductsByTitle={searchProductsByTitle} />
      <h2 className='pt-5 mt-5 text-center'><b>Your Cart</b></h2>

      {
        <>
          <DataTable
            columns={columns}
            data={searchCartItems}
            pagination
            fixedHeader
            className='cart-details pt-4'
          />

          {cartItems.length > 0 &&
            <div className='bottom-buttons text-center mt-3'>
              <button className='btn btn-danger' onClick={() => handleClearCart()}>Clear Cart</button>
              <button className='btn btn-info mx-3 text-white' onClick={openModal}>Proceed To Buy</button>

              {/* Modal Content */}
              {isModalOpen && (
                <div className='proceedModal-content' >
                  <div className="modal-wrapper" ref={modalRef}>
                    <div className="modal-container">
                      <span onClick={closeModal} className='close'>&times;</span>
                      <div className='cart-content'>
                        {cartItems.map(item => (
                          <span key={item.id}>
                            <img width="40px" height="40px" alt="img" src={item.img} />
                            <span>{item.title} ({item.quantity})</span>
                          </span>
                        ))}
                        <h4 className='d-flex pt-2 pb-4'>SubTotal <span>&lt;{cartItems.length} items&gt;</span> : &nbsp;<em className='ruppee-icon'>₹</em>{subTotalAmt}</h4>
                        <button className='btn btn-success m-auto d-block' onClick={handleCheckout}>Checkout</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {/* Modal Content Close */}
            </div>
          }

        </>
      }

    </div>

  )
}
