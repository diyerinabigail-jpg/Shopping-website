import { useState } from 'react';
import { formatPrice, getColorName } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import BenefitsBar from './BenefitsBar.jsx';
import Icon from './Icon.jsx';

const steps = ['Your bag', 'Delivery', 'Payment'];
const DEMO_PROMO = 'KIRALUX10';

export default function CheckoutPage({ onContinueShopping, onOpenProduct }) {
  const { cartItems, cartCount, cartTotal, changeQuantity, removeFromCart } = useShop();
  const [step, setStep] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('delivery');
  const [orderMessage, setOrderMessage] = useState('');
  const [delivery, setDelivery] = useState({ fullName: '', email: '', phone: '', address: '', city: '', state: '' });

  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const total = Math.max(0, cartTotal - discount);

  function applyPromo(event) {
    event.preventDefault();
    if (promoCode.trim().toUpperCase() === DEMO_PROMO) {
      setPromoApplied(true);
      setPromoMessage('Demo code applied — 10% off.');
    } else {
      setPromoApplied(false);
      setPromoMessage('That code isn’t valid. Try KIRALUX10 (demo code).');
    }
  }

  function updateDelivery(event) {
    const { name, value } = event.target;
    setDelivery((current) => ({ ...current, [name]: value }));
  }

  function continueToPayment(event) {
    event.preventDefault();
    setOrderMessage('');
    setStep(3);
  }

  function attemptPlaceOrder(event) {
    event.preventDefault();
    setOrderMessage('Checkout is a preview: no order or payment was submitted. Connect an order and payment provider to enable purchases.');
  }

  return (
    <div className="checkout-content">
      <nav className="checkout-steps" aria-label="Checkout progress">
        {steps.map((label, index) => {
          const number = index + 1;
          return (
            <button
              type="button"
              key={label}
              className={`checkout-step ${step === number ? 'current' : ''} ${step > number ? 'complete' : ''}`}
              onClick={() => {
                if (number === 1 || (number === 2 && step === 3)) setStep(number);
              }}
              aria-current={step === number ? 'step' : undefined}
              disabled={number > step || (number === 2 && step === 3)}
            >
              <span className="checkout-step-number">{step > number ? <Icon name="check" size={17} /> : number}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="checkout-layout">
        <section className="checkout-primary">
          <div className="checkout-title">
            <div>
              <h1>{step === 1 ? 'Your bag' : step === 2 ? 'Delivery details' : 'Payment'}</h1>
              <p>{step === 1 ? 'Review your items before proceeding to delivery.' : step === 2 ? 'Where should we send your KIRALUX finds?' : 'Choose how you’d like to pay.'}</p>
            </div>
            {step === 1 && <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>}
          </div>

          {step === 1 && (
            cartItems.length ? (
              <>
                <div className="checkout-items">
                  {cartItems.map((item) => (
                    <article className="checkout-item" key={item.cartKey}>
                      <button className="checkout-item-image" onClick={() => onOpenProduct(item)} aria-label={`View ${item.name}`}>
                        <img src={item.image} alt={item.name} />
                      </button>
                      <div className="checkout-item-info">
                        <button className="checkout-item-name" onClick={() => onOpenProduct(item)}>{item.name}</button>
                        <span className="checkout-item-category">{item.category === 'jewelry' ? 'Accessories' : item.category === 'kids' ? 'Kidswear' : item.category === 'men' ? "Men's style" : "Women's style"}</span>
                        <span className="checkout-item-variant">
                          {item.selectedColor ? `Color: ${getColorName(item.selectedColor)}` : 'In stock'}
                          {item.selectedSize && ` · Size: ${item.selectedSize}`}
                        </span>
                      </div>
                      <strong className="checkout-item-price">{formatPrice(item.price)}</strong>
                      <div className="checkout-quantity" aria-label={`${item.name} quantity`}>
                        <button onClick={() => changeQuantity(item.cartKey, -1)} aria-label={`Decrease ${item.name} quantity`}><Icon name="minus" size={15} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.cartKey, 1)} aria-label={`Increase ${item.name} quantity`}><Icon name="plus" size={15} /></button>
                      </div>
                      <button className="checkout-remove" onClick={() => removeFromCart(item.cartKey)} aria-label={`Remove ${item.name}`}><Icon name="close" size={18} /></button>
                    </article>
                  ))}
                </div>
                <button className="continue-shopping" onClick={onContinueShopping}><span>←</span> Continue shopping</button>
              </>
            ) : (
              <div className="checkout-empty">
                <span><Icon name="bag" size={27} /></span>
                <h2>Your bag is empty</h2>
                <p>Explore the collection and add something you love.</p>
                <button onClick={onContinueShopping}>Explore the shop <Icon name="arrow" size={16} /></button>
              </div>
            )
          )}

          {step === 2 && (
            <form className="delivery-form" onSubmit={continueToPayment}>
              <h2>Contact information</h2>
              <div className="delivery-fields">
                <label>Full name<input name="fullName" autoComplete="name" value={delivery.fullName} onChange={updateDelivery} required /></label>
                <label>Email address<input name="email" type="email" autoComplete="email" value={delivery.email} onChange={updateDelivery} required /></label>
                <label>Phone number<input name="phone" type="tel" autoComplete="tel" value={delivery.phone} onChange={updateDelivery} required /></label>
              </div>
              <h2 className="delivery-address-heading">Delivery address</h2>
              <div className="delivery-fields">
                <label className="delivery-field-wide">Street address<input name="address" autoComplete="street-address" value={delivery.address} onChange={updateDelivery} required /></label>
                <label>City<input name="city" autoComplete="address-level2" value={delivery.city} onChange={updateDelivery} required /></label>
                <label>State<input name="state" autoComplete="address-level1" value={delivery.state} onChange={updateDelivery} required /></label>
              </div>
              <div className="checkout-step-actions">
                <button type="button" className="checkout-back" onClick={() => setStep(1)}>← Back to bag</button>
                <button type="submit" className="checkout-primary-button">Continue to payment <Icon name="arrow" size={18} /></button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="payment-form" onSubmit={attemptPlaceOrder}>
              <section className="delivery-review">
                <div><h2>Delivering to</h2><button type="button" onClick={() => setStep(2)}>Edit</button></div>
                <strong>{delivery.fullName}</strong>
                <span>{delivery.address}, {delivery.city}, {delivery.state}</span>
                <span>{delivery.email} · {delivery.phone}</span>
              </section>
              <h2 className="payment-heading">Payment method</h2>
              <label className={`payment-option ${paymentMethod === 'delivery' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="delivery" checked={paymentMethod === 'delivery'} onChange={() => setPaymentMethod('delivery')} />
                <span className="payment-radio" />
                <span><b>Pay on delivery</b><small>Payment provider setup is required to place real orders.</small></span>
              </label>
              <label className="payment-option payment-option-disabled">
                <input type="radio" name="payment" value="online" disabled />
                <span className="payment-radio" />
                <span><b>Pay online</b><small>Coming soon — no card details are collected here.</small></span>
                <em>Coming soon</em>
              </label>
              <p className="checkout-preview-note"><Icon name="shield" size={17} /> This checkout preview does not submit orders or payments.</p>
              <div className="checkout-step-actions">
                <button type="button" className="checkout-back" onClick={() => setStep(2)}>← Back to delivery</button>
                <button type="submit" className="checkout-primary-button">Place order <Icon name="arrow" size={18} /></button>
              </div>
              {orderMessage && <p className="checkout-order-message" role="status">{orderMessage}</p>}
            </form>
          )}
        </section>

        <aside className="checkout-summary" aria-label="Order summary">
          <h2>Order Summary</h2>
          <div className="checkout-totals">
            <div><span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span><b>{formatPrice(cartTotal)}</b></div>
            <div><span>Shipping</span><b className="checkout-free">Free</b></div>
            <div><span>Discount</span><b className={discount ? 'checkout-discount' : ''}>{discount ? `− ${formatPrice(discount)}` : '—'}</b></div>
            <div className="checkout-grand-total"><strong>Total</strong><strong>{formatPrice(total)}</strong></div>
          </div>
          <form className="checkout-promo" onSubmit={applyPromo}>
            <label className="sr-only" htmlFor="checkout-promo-code">Promo code</label>
            <input id="checkout-promo-code" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Promo Code" disabled={promoApplied} />
            <button type="submit" disabled={promoApplied}>{promoApplied ? 'Applied' : 'Apply'}</button>
          </form>
          {promoMessage && <p className={`checkout-promo-message ${promoApplied ? 'success' : ''}`} role="status">{promoMessage}</p>}
          {step === 1 ? (
            <button className="checkout-primary-button checkout-summary-button" disabled={!cartItems.length} onClick={() => setStep(2)}>Continue to delivery <Icon name="chevron" size={19} /></button>
          ) : (
            <div className="checkout-summary-next"><Icon name="check" size={16} /> {step === 2 ? 'Delivery details next' : 'Ready for review'}</div>
          )}
          <div className="checkout-assurances">
            <div><Icon name="truck" size={25} /><span><b>Free Shipping</b><small>On every order</small></span></div>
            <div><Icon name="box" size={25} /><span><b>Easy Returns</b><small>30-day return policy</small></span></div>
            <div><Icon name="shield" size={25} /><span><b>Secure Checkout</b><small>Your information stays protected</small></span></div>
          </div>
        </aside>
      </div>
      <BenefitsBar />
    </div>
  );
}
