import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0); // or any initial calculation
  const [shippingcharges, setShippingCharges] = useState(0);
  const [tax, setTax] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:4000/shop/cart', { withCredentials: true });
      setCartData(response.data);
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart/delete/${id}`);
      setCartData(cartData.filter(item => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQuantity = async (id, action) => {
    try {
      await axios.patch(`http://localhost:4000/shop/cart/${id}`, { option: action });
      setCartData(prevData =>
        prevData.map(item => item.id === id ? { ...item, quantity: action === 'increment' ? item.quantity + 1 : Math.max(item.quantity - 1, 0) } : item)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const tempTotal = cartData.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  
    setTotal(tempTotal) 
    setTax((tempTotal/100)*18)
    setShippingCharges((tempTotal*0.02))
  }, [cartData]);
  
  
  return (
    <>
    
    <div className='px-4 lg:px-24 mt-16'>
      <div className="w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
        
        <h2 id="cart-heading" className="text-2xl font-semibold mb-4">Items in Your Shopping Cart</h2>
        <form className="flex flex-col lg:flex-row">
          <section aria-labelledby="cart-heading" className="flex-1 mb-4 lg:mr-4">
            <ul role="list" className="space-y-4">
              {/* Items */}



              {cartData.map(item => (
                
                <li key={item.id}>
                  
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    
                    {/* Product Image */}
                    <a href="#" className="shrink-0 md:order-1" aria-label={`View ${item.booktitle} details`}>
                      {/* <img className="h-20 w-20 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="iMac Image" /> */}
                      <img className="h-30 w-20 dark:block" src={item.bookimg} alt={item.booktitle} />
                    </a>
  
                    {/* Quantity Control */}
                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button onClick={() => updateQuantity(item.id, 'decrement')} type="button" id="decrement-button" aria-label="Decrease quantity" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"></path>
                          </svg>
                        </button>
                        
                        <input type="text" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" value={item.quantity} required aria-live="polite" readOnly/>
                        
                        <button onClick={() => updateQuantity(item.id, 'increment')} type="button" id="increment-button" aria-label="Increase quantity" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                          <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"></path>
                          </svg>
                        </button>
                      </div>
                      
                      {/* Price Display */}
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-base font-bold text-gray-900 dark:text-white">${item.price}</p>
                      </div>
                    </div>
  
                    {/* Product Description */}
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <a href="#" className="text-lg font-semibold text-gray-900 hover:underline dark:text-white transition duration-200 ease-in-out transform hover:scale-105" aria-label={`View ${item.booktitle} details`}>
                        {item.booktitle}
                      </a>
                      
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium text-gray-800 dark:text-gray-300">Author:</span> {item.bookauthor}
                        </p>
                      </div>

                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </div>

  
                      {/* Action Buttons */}
                      <div className="flex items-center gap-4">
                        <button id={item.id} type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white" aria-label="Add to favorites">
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"></path>
                          </svg>
                          Add to Favorites
                        </button>
  
                        <button onClick={() => handleDelete(item.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500" aria-label="Remove product from cart">
                          <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                </li>
              ))}

              
            </ul>
          </section>

          <section aria-labelledby="summary-heading" className="bg-gray-100 p-6 rounded shadow-md lg:w-1/3 h-[300px]">
  <h2 id="summary-heading" className="text-2xl font-semibold mb-6">Order Summary</h2>
  <dl className="space-y-4">
    <div className="flex justify-between items-center">
      <dt className="font-medium">Subtotal</dt>
      <dd className="font-medium">${total ? total.toFixed(2) : '0.00'}</dd> {/* Check if total is defined */}
    </div>
    <div className="flex justify-between items-center">
      <dt className="font-medium">Shipping Estimate</dt>
      <dd className="font-medium">${shippingcharges ? shippingcharges.toFixed(2) : '0.00'}</dd> {/* Check if shippingcharges is defined */}
    </div>
    <div className="flex justify-between items-center">
      <dt className="font-medium">Tax Estimate</dt>
      <dd className="font-medium">${tax ? tax.toFixed(2) : '0.00'}</dd> {/* Check if tax is defined */}
    </div>
    <div className="flex justify-between items-center font-bold">
      <dt>Total</dt>
      <dd>${(total + tax + shippingcharges).toFixed(2)}</dd> {/* Calculate total sum */}
    </div>
  </dl>
  <button
    type="button"
    aria-label="Proceed to Checkout"
    className="mt-6 w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
  >
    Proceed to Checkout
  </button>
</section>



        </form>
      </div>
    </div>

    </>

  );
}


