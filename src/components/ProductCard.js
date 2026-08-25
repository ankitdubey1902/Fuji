import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation click event
    dispatch(addItem(product));
  };

  return (
    <div 
      onClick={handleCardClick}
      className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-slate-800 cursor-pointer group"
    >
      <div>
        {/* Image Container (uses white/light-gray background for clean product presentation) */}
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-white p-4 flex items-center justify-center relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-2 right-2 px-2.5 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-slate-300 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Product Details */}
        <div className="mt-4 space-y-2">
          <h2 className="text-base font-bold text-gray-800 dark:text-slate-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {product.title}
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price and Action Button */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
        <span className="text-lg font-extrabold text-gray-900 dark:text-slate-100">
          {product.price ? `$${product.price.toFixed(2)}` : "$0.00"}
        </span>
        <button 
          onClick={handleAddToCart}
          className="rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
