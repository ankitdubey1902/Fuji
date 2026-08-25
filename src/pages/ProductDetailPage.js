import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addItem, updateQuantity, toggleCart } from "../store/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Read cart quantity for matching product ID
  const cartItem = useSelector((state) => 
    state.cart.items.find(item => item.id === Number(id))
  );

  // Sync details page quantity with Redux cart quantity
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("Product not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  const handleIncrease = () => {
    const nextQty = quantity + 1;
    setQuantity(nextQty);
    if (cartItem) {
      dispatch(updateQuantity({ id: product.id, quantity: nextQty }));
    }
  };

  const handleDecrease = () => {
    const nextQty = Math.max(1, quantity - 1);
    setQuantity(nextQty);
    if (cartItem) {
      dispatch(updateQuantity({ id: product.id, quantity: nextQty }));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      if (cartItem) {
        dispatch(toggleCart()); // Open drawer to show the item
      } else {
        dispatch(addItem({ ...product, quantity }));
      }
    }
  };

  return (
    <main className="flex-grow p-6 md:p-12 mx-auto max-w-7xl w-full">
      {/* Back navigation button */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group cursor-pointer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to products
        </button>
      </div>

      {loading && (
        <div className="flex py-40 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            <p className="text-gray-500 dark:text-slate-400 font-medium animate-pulse">Loading product details...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex py-20 items-center justify-center">
          <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm max-w-sm border border-red-100 dark:border-red-900/30">
            <p className="text-red-500 font-semibold mb-2">Error Occurred</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">{error}</p>
          </div>
        </div>
      )}

      {/* Product Details Panel */}
      {!loading && !error && product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-md border border-gray-100 dark:border-slate-800 animate-fadeIn">
          
          {/* Left Column: Image Canvas Gallery */}
          <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-gray-50 dark:bg-white p-8 flex items-center justify-center border border-gray-100/50 dark:border-slate-800">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Right Column: Information Catalog Layout */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-full mb-3">
                {product.category}
              </span>
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight mb-2 leading-tight">
                {product.title}
              </h1>

              {/* Rating Display */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-amber-400 text-sm">
                    {"★".repeat(Math.round(product.rating.rate))}
                    {"☆".repeat(5 - Math.round(product.rating.rate))}
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Divider Line */}
              <div className="border-b border-gray-100 dark:border-slate-800 my-4" />

              {/* Price Display */}
              <p className="text-3xl font-black text-gray-900 dark:text-slate-100 mb-4">
                ${product.price ? product.price.toFixed(2) : "0.00"}
              </p>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Functional CTA Elements Form Wrapper */}
            <div className="space-y-4 pt-6">
              {/* Quantity Control Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-700 dark:text-slate-300">Quantity:</span>
                <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-850 overflow-hidden">
                  <button 
                    onClick={handleDecrease}
                    className="px-3 py-1.5 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-slate-400 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-extrabold w-12 text-center bg-white dark:bg-slate-900 border-x border-gray-200 dark:border-slate-700 dark:text-slate-200 select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={handleIncrease}
                    className="px-3 py-1.5 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-slate-400 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Premium Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-md active:scale-98 transition-all text-center cursor-pointer ${
                    cartItem 
                      ? 'bg-emerald-600 hover:bg-emerald-500' 
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  {cartItem ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button 
                  className="flex-1 rounded-xl bg-gray-900 dark:bg-slate-800 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-gray-800 dark:hover:bg-slate-700 active:scale-98 transition-all text-center cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetailPage;
