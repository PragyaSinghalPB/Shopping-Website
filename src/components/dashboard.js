/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../assets/css/style.scss';
import '../assets/css/dashboard.scss';
import Header from './header';
import Sidebar from './sidebar';
import fetchData from '../service';
import Dataproduct from './dataProduct';
import Footer from './footer';
// import { useSelector } from 'react-redux';

import loader from '../assets/images/loader.gif';

function Dashboard() {

    const [products, setProducts] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Initially set loading to true
    const [dataNotFound, setDataNotFound] = useState(false); // Flag for no data

    useEffect(() => { //fetch data from api
        fetchStats();
    }, []);

    const fetchStats = async () => { //callback function or arrow function that stores api data
        
        setIsLoading(true);// Start loading

        try {
            let response = await fetchData();  // Fetch data
            setProducts(response); // Set fetched products to state
            setProductData(response); // Keep original data
        }
        catch (err) {
            console.log('Error fetching data:', err);  // Handle error
        }
        finally {
            setIsLoading(false); // Stop loading after fetching data or error
        }

    }

    // Function to filter products based on category
    const filteredProductsByCategory = (category) => {
        //when we see all products
        if (category === "all") {
            fetchStats();
        }
        const filteredData = productData.filter(item => item.category === category);
        setProducts(filteredData);
    }

    //Search products by title name
    const searchProductsByTitle = (value) => {
        const searchItems = productData.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        setProducts(searchItems);

        // no products are availabel at the time of search
        if(searchItems.length === 0){
            setDataNotFound(true); // No products found
        }
        else{
            setDataNotFound(false); // Products found
        }

    }
    
    return (
        <>
            {/* header */}
            <Header searchProductsByTitle={searchProductsByTitle} filteredData={filteredProductsByCategory}></Header>

            {/* Prodcuts-list */}
            <div className='loader position-relative'>
                {isLoading ? (
                    <div className='inner-load d-flex justify-content-center align-items-center'>
                        <img src={loader} width={50} height={50} alt='Loading...' />
                    </div>
                )
                :
                (
                    <div className='dashboard-wrapper'>
                        <div className="container-fluid">
                            <div className="row">
                                <Sidebar filteredData={filteredProductsByCategory}></Sidebar>
                                <main className="col-md-9 ms-sm-auto col-lg-10 p-md-4 mt-5">
                                    <div class="inner-details d-flex flex-wrap justify-content-center mt-3">
                                        <h2 className='mb-2'><b>Products List</b></h2>
                                        
                                        <div className='row'>
                                            {
                                                products.map(item => ( //products from state
                                                    <div className='col-3 m-2 p-3 border' key={item.id}>
                                                        <Dataproduct
                                                            id={item.id}
                                                            title={item.title}
                                                            price={item.price}
                                                            description={item.description}
                                                            img={item.image}
                                                            quantity={item.quantity}
                                                        />
                                                    </div>
                                                ))}
                                        </div>

                                        {/* Display 'No product found' if no products available */}
                                        {dataNotFound && (
                                            <p className='d-block w-100 text-center pt-5 mt-5'>No product found</p>
                                        )}
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* footer */}
            <Footer />
        </>
    )
}

export default Dashboard;
