import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Invalid data format received from server.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-grow p-6 md:p-12 mx-auto max-w-7xl w-full">
      {/* Loading state layout */}
      {loading && (
        <div className="flex py-40 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            <p className="text-gray-500 dark:text-slate-400 font-medium animate-pulse">Loading Fuji catalog...</p>
          </div>
        </div>
      )}

      {/* Error state layout */}
      {error && (
        <div className="flex py-20 items-center justify-center">
          <div className="text-center bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm max-w-sm border border-red-100 dark:border-red-900/30">
            <p className="text-red-500 font-semibold mb-2">Error Occurred</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">{error}</p>
          </div>
        </div>
      )}

      {/* Product Grid Catalog list */}
      {!loading && !error && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-slate-100 tracking-tight">Our Collection</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Discover handcrafted goods selected for daily life.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
                {products.length} Items Available
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default CatalogPage;
