import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.cartOpen = !state.cartOpen;
    },
    setCartOpen(state, action) {
      state.cartOpen = action.payload;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: newItem.quantity || 1,
        });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity >= 1) {
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const {
  toggleCart,
  setCartOpen,
  addItem,
  removeItem,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
