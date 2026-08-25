import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartOpen, removeItem, updateQuantity, clearCart } from '../store/cartSlice';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, cartOpen } = useSelector((state) => state.cart);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) {
      dispatch(removeItem(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQty }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div 
        className={`absolute inset-y-0 right-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out border-l border-gray-100 dark:border-slate-800 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-gray-900 dark:text-slate-100 tracking-tight">Shopping Cart</h2>
            <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full text-xs font-bold">
              {items.reduce((acc, item) => acc + item.quantity, 0)} Items
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 dark:text-slate-100 font-bold text-base">Your cart is empty</p>
                <p className="text-gray-400 dark:text-slate-500 text-xs mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={handleClose}
                className="text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline transition-all"
              >
                Go Shop Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 dark:border-slate-800/60 pb-4 last:border-b-0 last:pb-0 group">
                {/* Item Image */}
                <div className="w-20 h-20 bg-gray-50 dark:bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.title} className="max-h-full object-contain mix-blend-multiply" />
                </div>
                
                {/* Item Details */}
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 dark:text-slate-500 hover:text-red-500 p-0.5 rounded-full transition-colors flex-shrink-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-slate-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-slate-800 scale-90">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-slate-400 text-xs"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-xs font-black w-8 text-center bg-white dark:bg-slate-900 border-x border-gray-200 dark:border-slate-700 dark:text-slate-200">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-500 dark:text-slate-400 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 dark:text-slate-400 font-medium">Subtotal</span>
              <span className="text-xl font-black text-gray-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
            </div>
            
            <p className="text-xs text-gray-400 dark:text-slate-500">
              Shipping and taxes calculated at checkout.
            </p>

            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleClearCart}
                className="px-4 py-3.5 border border-gray-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900/30 transition-all text-center bg-white dark:bg-slate-900 shadow-sm"
              >
                Clear
              </button>
              <button className="flex-1 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-indigo-500 active:scale-98 transition-all text-center">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
