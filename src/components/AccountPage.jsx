import { useEffect, useMemo, useState } from 'react';
import { formatPrice, products } from '../data.jsx';
import { useShop } from '../hooks/useShop.js';
import Icon from './Icon.jsx';

const tabs = [
  { id: 'profile', label: 'Profile', icon: 'user' },
  { id: 'orders', label: 'Orders', icon: 'box' },
  { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  { id: 'addresses', label: 'Addresses', icon: 'home' },
  { id: 'coupons', label: 'Coupons', icon: 'tag' },
  { id: 'settings', label: 'Settings', icon: 'sun' },
];

const sampleOrders = [
  { id: 'NS789456', date: 'May 12, 2024', itemIds: [4, 2, 24], total: 34897, status: 'On its way', arrival: 'Arrives Tue, May 16', delivered: false },
  { id: 'NS789123', date: 'Apr 28, 2024', itemIds: [8, 9], total: 45999, status: 'Delivered', arrival: 'Delivered on May 2, 2024', delivered: true },
  { id: 'NS788901', date: 'Apr 03, 2024', itemIds: [12, 10, 3], total: 29990, status: 'Delivered', arrival: 'Delivered on Apr 6, 2024', delivered: true },
];

const initialProfile = { name: 'Alina Putri', email: 'alina.putri@example.com', phone: '+62 812 3456 7890' };
const initialAddress = { line1: 'Jl. Melati No. 28', line2: 'Kebayoran Baru, Jakarta Selatan', city: 'DKI Jakarta 12160', country: 'Indonesia' };

function OrderStatus({ order }) {
  return (
    <span className={`account-order-status ${order.delivered ? 'delivered' : 'shipping'}`}>
      <Icon name={order.delivered ? 'check' : 'truck'} size={15} /> {order.status}
    </span>
  );
}

export default function AccountPage({ initialTab = 'orders', onNavigate, onOpenProduct }) {
  const { wishlist, addToCart } = useShop();
  const [activeTab, setActiveTab] = useState(tabs.some((tab) => tab.id === initialTab) ? initialTab : 'orders');
  const [orderFilter, setOrderFilter] = useState('All Orders');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [profile, setProfile] = useState(initialProfile);
  const [address, setAddress] = useState(initialAddress);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);
  const [notice, setNotice] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [orderSearch, setOrderSearch] = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    setActiveTab(tabs.some((tab) => tab.id === initialTab) ? initialTab : 'orders');
  }, [initialTab]);

  const visibleOrders = useMemo(() => sampleOrders.filter((order) => {
    const matchesFilter = orderFilter === 'All Orders' || order.status === orderFilter;
    const normalizedQuery = orderSearch.trim().toLowerCase();
    const matchesSearch = !normalizedQuery || order.id.toLowerCase().includes(normalizedQuery) ||
      order.itemIds.some((id) => products.find((product) => product.id === id)?.name.toLowerCase().includes(normalizedQuery));
    return matchesFilter && matchesSearch;
  }), [orderFilter, orderSearch]);

  function saveProfile(event) {
    event.preventDefault();
    setEditingProfile(false);
    setNotice('Your profile changes have been saved in this preview.');
  }

  function saveAddress(event) {
    event.preventDefault();
    setEditingAddress(false);
    setNotice('Your address has been saved in this preview.');
  }

  async function copyCoupon() {
    try {
      await navigator.clipboard.writeText('KIRALUX10');
      setCopiedCoupon(true);
      setNotice('KIRALUX10 copied — use it at checkout for 10% off.');
    } catch (error) {
      setNotice('Your demo code is KIRALUX10 — enter it at checkout for 10% off.');
    }
  }

  function buyAgain(order) {
    order.itemIds.forEach((id) => addToCart(id));
    setNotice(`Added ${order.itemIds.length} sample items to your bag.`);
  }

  const selectedWishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="account-content">
      <div className="account-heading">
        <div><h1>Your account</h1><p>Manage your profile, orders and preferences all in one place.</p></div>
        <button className="account-mobile-edit" onClick={() => { setActiveTab('profile'); setEditingProfile(true); }}>Edit profile</button>
      </div>

      <div className="account-columns">
        <main className="account-main-column">
          <section className="account-profile-card">
            <div className="account-avatar" aria-hidden="true">A</div>
            <div className="account-profile-copy">
              <h2>{profile.name}</h2>
              <span>Member since Jan 2024</span>
              <span>Happy shopping! <b>✨</b></span>
            </div>
            <button className="account-edit-profile" onClick={() => { setActiveTab('profile'); setEditingProfile(true); }}><Icon name="user" size={18} /> Edit Profile</button>
          </section>

          <nav className="account-tabs" aria-label="Account sections">
            {tabs.map((tab) => (
              <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => { setActiveTab(tab.id); setNotice(''); }}>
                <Icon name={tab.icon} size={22} /><span>{tab.label}</span>
              </button>
            ))}
          </nav>

          {notice && <p className="account-notice" role="status"><Icon name="check" size={16} />{notice}</p>}

          {activeTab === 'orders' && (
            <section className="account-orders-panel">
              <div className="account-panel-heading">
                <div><h2>Your Orders</h2><p>Track, return or buy again from your recent orders.</p></div>
                <label className="account-order-filter"><span className="sr-only">Filter orders by status</span>
                  <select value={orderFilter} onChange={(event) => setOrderFilter(event.target.value)}>
                    <option>All Orders</option><option>On its way</option><option>Delivered</option>
                  </select><Icon name="chevron" size={15} />
                </label>
              </div>
              <label className="account-order-search"><Icon name="search" size={17} /><input value={orderSearch} onChange={(event) => setOrderSearch(event.target.value)} placeholder="Search by order number or item" /></label>
              {visibleOrders.length ? <div className="account-order-list">
                {visibleOrders.map((order) => {
                  const items = order.itemIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);
                  const expanded = expandedOrder === order.id;
                  return (
                    <article className={`account-order-card ${expanded ? 'expanded' : ''}`} key={order.id}>
                      <div className="account-order-meta">
                        <strong>Order #{order.id}</strong><span>{order.date}</span><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                      </div>
                      <div className="account-order-products">
                        {items.slice(0, 3).map((item) => (
                          <button key={item.id} onClick={() => onOpenProduct(item)} title={item.name}>
                            <img src={item.image} alt={item.name} />
                          </button>
                        ))}
                      </div>
                      <div className="account-order-delivery">
                        <strong>{formatPrice(order.total)}</strong><OrderStatus order={order} /><span>{order.arrival}</span>
                      </div>
                      <div className="account-order-actions">
                        <button className="account-track-button" onClick={() => setTrackingOrder(order)}><Icon name="truck" size={16} /> Track order</button>
                        <button className="account-details-button" onClick={() => setExpandedOrder(expanded ? null : order.id)}>{expanded ? 'Hide details' : 'View details'}</button>
                        <button className="account-buy-again" onClick={() => buyAgain(order)}>Buy again</button>
                      </div>
                      {expanded && <div className="account-order-expanded">
                        {items.map((item) => <div key={item.id}><span>{item.name}</span><b>{formatPrice(item.price)}</b></div>)}
                        <div><span>Shipping</span><b>Free</b></div>
                        <div className="expanded-total"><span>Order total</span><b>{formatPrice(order.total)}</b></div>
                      </div>}
                    </article>
                  );
                })}
              </div> : <div className="account-empty-state"><Icon name="box" size={28} /><b>No orders found</b><span>Try a different status or search term.</span></div>}
              <p className="account-demo-note">Sample order history shown for design preview; this storefront is not connected to order records.</p>
            </section>
          )}

          {activeTab === 'profile' && (
            <section className="account-detail-panel">
              <div className="account-panel-heading"><div><h2>Profile information</h2><p>Keep your contact details up to date.</p></div></div>
              {editingProfile ? <form className="account-edit-form" onSubmit={saveProfile}>
                <label>Full name<input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
                <label>Email address<input type="email" required value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} /></label>
                <label>Phone number<input type="tel" required value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} /></label>
                <div className="account-form-actions"><button type="button" onClick={() => setEditingProfile(false)}>Cancel</button><button type="submit">Save changes</button></div>
              </form> : <div className="account-profile-details"><div><span>Name</span><b>{profile.name}</b></div><div><span>Email</span><b>{profile.email}</b></div><div><span>Phone</span><b>{profile.phone}</b></div><button onClick={() => setEditingProfile(true)}>Edit profile</button></div>}
            </section>
          )}

          {activeTab === 'wishlist' && (
            <section className="account-detail-panel">
              <div className="account-panel-heading"><div><h2>Your Wishlist</h2><p>{selectedWishlistProducts.length} saved {selectedWishlistProducts.length === 1 ? 'item' : 'items'} for later.</p></div></div>
              {selectedWishlistProducts.length ? <div className="account-wishlist-grid">{selectedWishlistProducts.map((product) => <article key={product.id}>
                <button className="account-wishlist-image" onClick={() => onOpenProduct(product)}><img src={product.image} alt={product.name} /></button><b>{product.name}</b><span>{formatPrice(product.price)}</span><button onClick={() => { addToCart(product.id); setNotice(`${product.name} added to your bag.`); }}>Add to bag</button>
              </article>)}</div> : <div className="account-empty-state"><Icon name="heart" size={28} /><b>Your wishlist is waiting</b><span>Save your favorite pieces and they’ll be here.</span><button onClick={() => onNavigate('/shop')}>Explore the shop</button></div>}
            </section>
          )}

          {activeTab === 'addresses' && (
            <section className="account-detail-panel">
              <div className="account-panel-heading"><div><h2>Saved addresses</h2><p>Manage where your KIRALUX orders are delivered.</p></div></div>
              {editingAddress ? <form className="account-edit-form" onSubmit={saveAddress}>
                {Object.entries({ line1: 'Street address', line2: 'District / area', city: 'City and postal code', country: 'Country' }).map(([key, label]) => <label key={key}>{label}<input required value={address[key]} onChange={(event) => setAddress({ ...address, [key]: event.target.value })} /></label>)}
                <div className="account-form-actions"><button type="button" onClick={() => setEditingAddress(false)}>Cancel</button><button type="submit">Save address</button></div>
              </form> : <div className="account-saved-address"><Icon name="home" size={23} /><div><b>{profile.name}</b><span>{address.line1}</span><span>{address.line2}</span><span>{address.city}</span><span>{address.country}</span><em>Default address</em></div><button onClick={() => setEditingAddress(true)}>Edit address</button></div>}
            </section>
          )}

          {activeTab === 'coupons' && (
            <section className="account-detail-panel">
              <div className="account-panel-heading"><div><h2>Your Coupons</h2><p>A little thank-you for shopping with us.</p></div></div>
              <article className="account-coupon"><span>WELCOME OFFER</span><strong>10% off your order</strong><p>Valid on your next order. Use at checkout.</p><div><code>KIRALUX10</code><button onClick={copyCoupon}>{copiedCoupon ? 'Copied!' : 'Copy code'}</button></div></article>
              <p className="account-demo-note">Demo coupon for this preview. Apply KIRALUX10 at checkout.</p>
            </section>
          )}

          {activeTab === 'settings' && (
            <section className="account-detail-panel">
              <div className="account-panel-heading"><div><h2>Account settings</h2><p>Choose how you’d like to hear from us.</p></div></div>
              <label className="account-setting-row"><span><b>Shopping updates</b><small>Get updates about orders and deliveries.</small></span><input type="checkbox" defaultChecked /></label>
              <label className="account-setting-row"><span><b>News and offers</b><small>Hear about new arrivals and member offers.</small></span><input type="checkbox" checked={newsletter} onChange={(event) => setNewsletter(event.target.checked)} /></label>
              <div className="account-setting-row"><span><b>Password</b><small>Keep your account secure.</small></span><button onClick={() => setNotice('Password management will be available when account services are connected.')}>Change password</button></div>
            </section>
          )}

          <section className="account-rewards-banner">
            <Icon name="star" size={31} />
            <div><b>Members save more!</b><span>You’ve earned 320 points. Keep shopping to unlock bigger rewards.</span></div>
            <button onClick={() => setActiveTab('coupons')}>View My Rewards <Icon name="arrow" size={16} /></button>
          </section>
        </main>

        <aside className="account-side-column">
          <section className="account-address-card">
            <div className="account-side-heading"><h2>Default delivery address</h2><button onClick={() => { setActiveTab('addresses'); setEditingAddress(true); }}><Icon name="edit" size={17} /> Edit</button></div>
            <div className="account-address-body"><Icon name="pin" size={24} /><div><b>{profile.name}</b><span>{address.line1}</span><span>{address.line2}</span><span>{address.city}</span><span>{address.country}</span></div></div>
          </section>
          <section className="account-club-card"><span>KIRALUX CLUB <b>♛</b></span><h2>Good things<br />come to members.</h2><p>Get exclusive perks, early access and more!</p><button onClick={() => setActiveTab('coupons')}>Learn more <Icon name="arrow" size={15} /></button><i aria-hidden="true">✳</i></section>
          <section className="account-perks-card">
            <div><Icon name="box" size={21} /><span>Free shipping on select items</span></div>
            <div><Icon name="tag" size={21} /><span>Exclusive member deals</span></div>
            <div><Icon name="user" size={21} /><span>Early access to new arrivals</span></div>
            <div><Icon name="star" size={21} /><span>Birthday surprises</span></div>
          </section>
        </aside>
      </div>

      {trackingOrder && <div className="account-modal-backdrop" onClick={() => setTrackingOrder(null)}>
        <section className="account-tracking-modal" role="dialog" aria-modal="true" aria-labelledby="tracking-title" onClick={(event) => event.stopPropagation()}>
          <div className="account-modal-heading"><div><h2 id="tracking-title">Track order #{trackingOrder.id}</h2><p>{trackingOrder.arrival}</p></div><button onClick={() => setTrackingOrder(null)} aria-label="Close tracking"><Icon name="close" size={20} /></button></div>
          <div className="tracking-timeline">
            <div className="done"><i /><span><b>Order confirmed</b><small>{trackingOrder.date}</small></span></div>
            <div className="done"><i /><span><b>Packed with care</b><small>Your items are ready to go.</small></span></div>
            <div className={trackingOrder.delivered ? 'done' : 'current'}><i /><span><b>{trackingOrder.delivered ? 'Delivered' : 'On its way'}</b><small>{trackingOrder.arrival}</small></span></div>
          </div>
          <p className="account-demo-note">Sample tracking status shown for design preview.</p>
        </section>
      </div>}
    </div>
  );
}
