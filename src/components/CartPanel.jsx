import { useShop } from '../hooks/useShop.js';
import { formatPrice, getColorName } from '../data.jsx';
import Icon from './Icon.jsx';

export default function CartPanel({ onClose, onCheckout, mobile = false }) {
  const { cartItems, cartCount, cartTotal, changeQuantity, removeFromCart } = useShop();

  return (
    <>
      {mobile && <button className="cart-scrim" onClick={onClose} aria-label="Close cart" />}
      <aside className={`cart-panel ${mobile ? 'cart-panel-mobile' : ''}`} aria-label="Shopping cart">
        <div className="cart-heading">
          <div><h2>My Cart <span>({cartCount})</span></h2><small>Items are selling fast — check out soon.</small></div>
          {mobile && <button className="mobile-close" onClick={onClose} aria-label="Close cart"><Icon name="close" /></button>}
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty"><span className="cart-empty-icon"><Icon name="bag" size={24} /></span><b>Your cart is waiting</b><span>Explore our picks and add something you love.</span></div>
          ) : cartItems.map((item) => (
            <div className="cart-item" key={item.cartKey}>
              <div className="cart-item-image"><img src={item.image} alt={item.name} /></div>
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span className="cart-item-variant">{[item.selectedColor && getColorName(item.selectedColor), item.selectedSize].filter(Boolean).join(' / ') || 'In stock'}</span>
                <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                <div className="quantity-control">
                  <button onClick={() => changeQuantity(item.cartKey, -1)} aria-label={`Decrease ${item.name} quantity`}><Icon name="minus" size={12} /></button>
                  <span>{item.quantity}</span>
                  <button onClick={() => changeQuantity(item.cartKey, 1)} aria-label={`Increase ${item.name} quantity`}><Icon name="plus" size={12} /></button>
                </div>
              </div>
              <button className="remove-item" onClick={() => removeFromCart(item.cartKey)} aria-label={`Remove ${item.name}`}><Icon name="close" size={15} /></button>
            </div>
          ))}
        </div>
        <div className="cart-checkout">
          <label className="promo-code"><input aria-label="Promo code" placeholder="Promo code" /><button>Apply</button></label>
          <div className="total-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
          <div className="total-row discount-row"><span>Discount</span><span>—</span></div>
          <div className="total-row"><span>Shipping</span><span className="shipping-free">Free</span></div>
          <div className="total-row grand-total"><b>Total</b><b>{formatPrice(cartTotal)}</b></div>
          <button className="checkout-button" disabled={!cartItems.length} onClick={onCheckout}>
            <Icon name="shield" size={16} /> Checkout ({cartCount}) <Icon name="arrow" size={16} />
          </button>
          <div className="payment-methods"><span>We accept</span><b>VISA</b><b className="mastercard">●●</b><b> Pay</b><b>G Pay</b></div>
        </div>
      </aside>
    </>
  );
}
