import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './header';
import IndianStates from '../states.json';
import { useForm } from 'react-hook-form';
import { cartActions } from '../redux/reducers/cartSlice';

export default function Checkout() {

const navigate = useNavigate();
const dispatch = useDispatch();

const checkoutItems = useSelector((state) => state.cart.checkoutItems);

//Checkout-form
const {register, handleSubmit, formState: {errors}} = useForm();

//Payment mode change
const [proceedOnlineButton, setProceedOnlineButton] = useState(false);

const onPaymentModeChange = (e) => {
    let value = e.target.value;
    if(value === 'online'){
        setProceedOnlineButton(true);
    }
    else{
        setProceedOnlineButton(false);
    }
}

//Alert Message show for 'online-payment' or 'cod' with data storage
const placeOrder = (data) => {
    if(proceedOnlineButton){
        alert('Sorry, server down for online payment !!');
    }
    else{
        let placeItemsObj = {
            customerInfo: data,
            items: checkoutItems.items
        }
        dispatch(cartActions.setPlacedOrders({placeItemsObj}));
        dispatch(cartActions.removeCheckoutItems());
        alert('Congratulations your order is placed Successfully!! Press OK to explore more items.');
        dispatch(cartActions.clearCart());
        navigate('/dashboard');
    }
}

//Promo Code
const[promocode, setPromocode] = useState('');
const[discountAmt, setDiscountAmt] = useState(0);
const[discountClaimed, setDiscountClaimed] = useState(false); //discount already added/used

let totalAmount = checkoutItems.total; //total Amount of all checkout items

const redeemPromoCode = () => {
    if(promocode && promocode === 'SAVE20' && !discountClaimed){
        let discount = (0.20) * totalAmount;
        setDiscountAmt(discount.toFixed(2));
        totalAmount -= discount; //totalAmount = totalAmount - discount
        setDiscountClaimed(true);
    }
    else{
        if(discountClaimed){
            alert('Discount already applied'); //use onKeydown for showing alert popup 'discount already applied'
        }
        else if(promocode === null || promocode === ''){ //if value is null or empty string
            alert('Please enter the promocode');
        }        
        else{
            alert('Please enter the valid promocode'); 
        }  
    }
}
 
//onClick Reedm btn
const handlePromoCode = (e) => {
  let value = (e.target.value).toUpperCase().trim(); //trim remove side space
  setPromocode(value);
}


console.log(checkoutItems);

  return (
    <div className='dashboard_wrapper'>
        <Header />
        <div className='checkout-details pt-5 mt-5'>
            <div className='container'>
                <h2 className='mb-3'><b>Checkout Details</b></h2>
                <div className='row'>
                    <div className='col-md-7'>
                        <div className='checkout-form'>
                          <form onSubmit={handleSubmit(placeOrder)} className='d-flex flex-wrap'> 
                            <div className="form-group w-50 mb-3">
                                <label>Name</label>
                                <input type="text" pattern="[a-zA-Z]*" className='form-control' name='name' {...register('name', {required: true})} />
                                {errors.name && <small className='error pt-1 d-block'>Please enter your name</small>}
                            </div>
                            <div className="form-group w-50 mb-3">
                                <label>Email</label>
                                <input type="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" className='form-control' name='email' {...register('email', {required: true})}  />
                                {errors.email && <small className='error pt-1 d-block'>Please enter your valid email</small>}
                            </div>
                            <div className="form-group w-100 mb-3">
                                <label>Mobile Number</label>
                                <input type="text" pattern="^[6789][0-9]{9}$" className='form-control' maxLength={10} name='mobile number' {...register('mobile', {required: true})} />
                                {errors.mobile && <small className='error pt-1 d-block'>Please enter your valid mobile number</small>}
                            </div>
                            <div className="form-group w-100 mb-3">
                                <label>Payment Mode</label>
                                <div className='form-check p-0 m-0'>
                                    <input type="radio" name='paymentmode' {...register('paymentmode')} value='online' onChange={(e) => onPaymentModeChange(e)} />
                                    <label className='px-2'>Online Payment</label>
                                    <input type="radio" name='paymentmode' {...register('paymentmode')} value='cod' className='px-2' defaultChecked onChange={(e) => onPaymentModeChange(e)}  />
                                    <label className='px-2'>Cash on delivery</label>
                                </div>
                            </div>
                            <div className="form-group w-100 mb-3">
                                <label>Address</label>
                                <textarea type="text" className='form-control' name='address' rows={3} {...register('address', {required: true})} ></textarea>
                                {errors.address && <small className='error pt-1 d-block'>Please enter your valid address</small>}
                            </div>
                            <div className="form-group mb-4 w-50">
                                <label>State</label>
                                <select className='form-control' name='state' {...register('state')}>
                                    <option defaultValue>--State--</option>
                                    {
                                        IndianStates.map((obj) => (
                                            <option key={obj.code} value={obj.name}>{obj.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='form-group mb-4 w-50'>
                                <label>Zip</label>
                                <input type="text" className='form-control' name='pincode' {...register('pincode')} />
                            </div>
                            <div className='form-group w-100'>
                                <button type='submit' className='btn btn-primary w-100'>
                                    {proceedOnlineButton ? 'Proceed To Pay' : 'Place Order'}
                                </button>
                            </div>
                          </form>  
                        </div>
                    </div>
                    <div className='col-md-4 offset-1'>
                        <div className='checkout-content border rounded shadow p-3 h-100'>
                           <h4 className='d-flex mb-3'>
                              <span className='text-primary'>Your Cart</span>
                              <span className="badge rounded-pill bg-primary">{checkoutItems.items.length}</span>
                           </h4>

                           <ul className='list-group mb-3'>
                              {checkoutItems.items.map(obj => (
                                <li className='list-group-item d-flex' key={obj.id}>
                                    <h6 className='fw-bold'>{obj.title} <span className='d-block fw-normal'>Quantity: {obj.quantity}</span></h6>
                                    <span className='fw-bold text-end'><em className='ruppee-icon'>₹</em>{obj.totalPrice.toFixed(2)} <span className='d-block fw-normal text-muted'><em className='ruppee-icon'>₹</em>{obj.price.toFixed(2)} <small>per item</small></span></span>
                                </li>
                                ))
                              }  
                              <li className='list-group-item d-flex bg-light text-success'>
                                <h5 className='fw-normal'>Promo Code</h5>
                                <span className='text-end'><em className='ruppee-icon'>₹</em>{discountAmt}</span>
                              </li>
                              <li className='list-group-item d-flex'>
                                <h5 className='fw-bold'>Total Amount</h5>
                                <span className='fw-bold text-end'><em className='ruppee-icon'>₹</em>{Number(checkoutItems.total - discountAmt).toFixed(2)}</span>
                              </li>
                           </ul>

                            <div className='input-group m-0'>
                                <input type='text' className='form-control' placeholder='Promo Code' onKeyDown={(e) => {if(e.key === 'Enter') {redeemPromoCode()}} } onChange={(e) => handlePromoCode(e)} disabled={discountClaimed} />
                                <button type='submit' className='btn btn-secondary' onClick={() => redeemPromoCode()} disabled={discountClaimed}>Redeem</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
