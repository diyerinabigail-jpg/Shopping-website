import { createContext, useCallback, useMemo, useState } from 'react';
import { getProductById } from '../data.jsx';

export const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);

  const addToCart = useCallback((id, quantity = 1, variant = {}) => {
    const productId = Number(id);
    const variantKey = variant.size || variant.color
      ? `${productId}::${variant.size || ''}::${variant.color || ''}`
      : String(productId);
    setCart((current) => ({
      ...current,
      [variantKey]: {
        productId,
        quantity: (current[variantKey]?.quantity || 0) + quantity,
        size: variant.size || '',
        color: variant.color || '',
      },
    }));
  }, []);

  const changeQuantity = useCallback((id, amount) => {
    setCart((current) => {
      const quantity = (current[id]?.quantity || 0) + amount;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: { ...current[id], quantity } };
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }, []);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([cartKey, line]) => {
          const product = getProductById(line.productId);
          return product ? { ...product, cartKey, quantity: line.quantity, selectedSize: line.size, selectedColor: line.color } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      wishlist,
      addToCart,
      changeQuantity,
      removeFromCart,
      toggleWishlist,
    }),
    [
      cartItems,
      cartCount,
      cartTotal,
      wishlist,
      addToCart,
      changeQuantity,
      removeFromCart,
      toggleWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
