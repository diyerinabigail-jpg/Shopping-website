import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
