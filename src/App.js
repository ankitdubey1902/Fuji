import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
            {/* Global Header */}
            <Header />
            
            {/* Main views mapped to Routes */}
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/new-arrivals" element={<NewArrivalsPage />} />
              <Route path="/about" element={<AboutUsPage />} />
            </Routes>
            
            {/* Global Footer */}
            <Footer />
            
            {/* Global slide-over Cart Drawer overlay */}
            <CartDrawer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
