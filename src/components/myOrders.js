import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './header';
import DataTable from 'react-data-table-component';

export default function MyOrders() {

  const myorders = useSelector((state) => state.cart.placedOrders);

  const [searchOrderItems, setSearchOrderItems] = useState(myorders?.placeItemsObj?.items);

  useEffect(() => {
    setSearchOrderItems(myorders?.placeItemsObj?.items); // Initially show all previous order items here (?) means on relaoding/empty page error not shown
  }, [myorders]);


  const columns = [

    {
      name: 'Id',
      selector: row => row.id,
    },

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
      selector: row => <>
        <span className='px-2'>{row.quantity}</span>
      </>
    },

    {
      name: 'Total Amount',
      selector: row => <span><em className='ruppee-icon'>₹</em>{Number(row.totalPrice).toFixed(2)}</span>
    }




  ]

  //Search product by title
  const searchProductsByTitle = (value) => {
    const searchItems = searchOrderItems?.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    setSearchOrderItems(searchItems); // Update state with filtered items
  }

  return (
    <div className='myorders pt-5 mt-5'>
      <Header searchProductsByTitle={searchProductsByTitle} />

      <div className='table-wrapper'>
        <DataTable
          columns={columns}
          data={searchOrderItems} // Use the filtered searchOrderItems state here
          pagination
        />
      </div>

    </div>


  )
}

