import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const NewArrivalsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          // Curate "New Arrivals" by taking items from specific premium categories or higher IDs
          // Let's filter products with ID > 8 and sort them to show a subset of 8 items
          const curated = response.data
            .filter(item => item.id > 6)
            .slice(0, 8);
          setProducts(curated);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load new arrivals. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex-grow w-full pb-12">
      {/* Hero Banner Section (Always dark theme aesthetic for rich accentuation) */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-16 px-6 md:px-12 text-center relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_40%)]"></div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-500/30">
            Just In
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            The Autumn Release
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto font-medium">
            Explore our latest curated drops featuring ultra-premium craftsmanship, organic materials, and thoughtful modern designs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Loading state layout */}
        {loading && (
          <div className="flex py-20 items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-indigo-200 dark:border-slate-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-slate-400 font-medium animate-pulse">Fetching new releases...</p>
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

        {/* Product Grid */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4 mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-slate-100 tracking-tight">New Drops</h2>
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider bg-gray-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-800">
                Sorted by Latest
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      New
                    </span>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default NewArrivalsPage;
