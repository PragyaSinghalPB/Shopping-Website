import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import secureLocalStorage from "react-secure-storage";

//key-pass
const reduxSessionKey = 'ABCDEFGH';

// Function to load state from localStorage/Load the state from localStorage on application start through key:
const loadState = () => {
    try{
        const storedDataState = secureLocalStorage.getItem(reduxSessionKey); 
        if(storedDataState === null){
            return undefined; // No saved state, return undefined to use default state
        }
        return JSON.parse(decodeURIComponent(storedDataState)) //decodeURIComponent remove special characters, symbols
    } 
    catch (err) {
        console.log('Error not found', err);
        return undefined;
    }
} 

// Function to save state to localStorage with key and value:
const saveState = (state) => {
    try {
        let storedDataState = encodeURIComponent(JSON.stringify(state)); //encodeURIComponent remove special characters, symbols
        secureLocalStorage.setItem(reduxSessionKey, storedDataState);
    } 
    catch (err) {
        console.log('Error not found', err);
    }
}

// Load the state from localStorage (if it exists)
const preloadedState = loadState();

// Create the Redux store, passing the preload state
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    },
    preloadedState: preloadedState // Pass the loaded state to the store as the initial state
});

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
   saveState(store.getState());
});


export default store;



