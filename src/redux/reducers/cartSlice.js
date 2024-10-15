import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        productArray: [],
        totalQuantity: 0,
        totalPrice: 0,
        showCart: false,
        checkoutItems : [],
        placedOrders: [],
    },
    reducers: {

        //increase quantity
        addToCart(state, action) {
            const newItem = action.payload;
            const item = current(state.productArray);
            const existingItem = item.find((item) => item.id === newItem.product.id);
            // console.log(existingItem);
            if(existingItem){
                state.productArray.forEach((item) => { //forEach update the existing items whereas map returns new array
                    if (item.id === existingItem.id) {
                        item.quantity++;
                        item.totalPrice += newItem.product.price;
                    }
                })
            }
            else{
                state.productArray.push({
                    id: newItem.product.id,
                    price: newItem.product.price,
                    quantity: 1,
                    totalPrice: newItem.product.price,
                    title: newItem.product.title,
                    img: newItem.product.img
                });
                state.totalQuantity++;
            }
         },

        //decrease quantity 
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = current(state.productArray).find((item) => item.id === id); //find use to return an object
            if(existingItem.quantity === 1){
                state.productArray = state.productArray.filter((item) => item.id !== id); //filter returns an array
            }
            else{ 
                //greater then existing items
                state.productArray.forEach((item) => { //forEach update the existing items whereas map returns new array
                    if (item.id === existingItem.id){
                        item.quantity--;
                        item.totalPrice -= existingItem.price;
                    }
                })
            }
         },

        //Delete particular item onClick delete icon:
        removeProductItem(state , action){
           const remainingItems = current(state.productArray).filter((item) => item.id !== action.payload); //find use to return an object
           state.productArray = remainingItems;
        },

        //clear cart items
        clearCart(state) {
            state.productArray = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },

        // show deafult cart page
        setShowCart(state) {
            state.showCart = !state.showCart;
        },

        //checkout page default items
        addCheckoutItems(state , action) {
            state.checkoutItems = action.payload
        },

        removeCheckoutItems(state){
            state.checkoutItems = [];
        },

        //myorders page default items
        setPlacedOrders(state, action) {
            state.placedOrders = action.payload;
        }

    }

})



export const cartActions = cartSlice.actions;
export default cartSlice;

