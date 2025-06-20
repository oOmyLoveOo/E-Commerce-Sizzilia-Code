import React, { useReducer } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from '../contexts/CartContext';
import { initialState, cartReducer } from '../types/cart';
import type { CartItem } from '../types/cart';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...item, quantity } 
    });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};