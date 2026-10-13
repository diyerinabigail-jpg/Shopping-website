import { useState } from 'react';
import Icon from './Icon.jsx';

const groups = [
  { title: 'Shop', links: [['New arrivals', '/shop'], ['Women', '/shop?category=women'], ['Men', '/shop?category=men'], ['Kids', '/shop?category=kids'], ['Jewelry', '/shop?category=jewelry']] },
  { title: 'Customer care', links: [['Contact us', 'mailto:hello@kiralux.com'], ['Shipping & returns', 'mailto:hello@kiralux.com?subject=Shipping%20and%20returns'], ['FAQs', 'mailto:hello@kiralux.com?subject=FAQs']] },
  { title: 'About KIRALUX', links: [['Our story', 'mailto:hello@kiralux.com?subject=Our%20story'], ['Privacy policy', 'mailto:hello@kiralux.com?subject=Privacy%20policy'], ['Terms of service', 'mailto:hello@kiralux.com?subject=Terms']] },
];

export default function HomeFooter({ onNavigate }) {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="home-footer">
      <section className="home-footer-promo">
        <div><span>THE KIRALUX EDIT</span><h2>A little more you,<br />in every detail.</h2><p>Find the pieces that make getting dressed feel good.</p></div>
        <button onClick={() => onNavigate('/shop')}>Explore the collection <Icon name="arrow" size={16} /></button>
        <span className="home-footer-spark" aria-hidden="true">✳</span>
      </section>
      <div className="home-footer-main">
        <section className="home-footer-about">
          <a className="brand" href="/" onClick={(event) => { event.preventDefault(); onNavigate('/'); }}>
            <span className="brand-mark">K</span><span>KIRALUX</span>
          </a>
          <p>Good finds, thoughtful details, and everyday pieces that feel like you.</p>
          <div className="home-footer-socials" aria-label="Follow KIRALUX"><a href="https://www.instagram.com/" aria-label="Instagram">ig</a><a href="https://www.facebook.com/" aria-label="Facebook">f</a><a href="https://www.pinterest.com/" aria-label="Pinterest">p</a></div>
        </section>
        {groups.map((group) => (
          <nav className="home-footer-links" aria-label={group.title} key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => href.startsWith('/shop')
              ? <a key={label} href={href} onClick={(event) => { event.preventDefault(); onNavigate(href); }}>{label}</a>
              : <a key={label} href={href}>{label}</a>)}
          </nav>
        ))}
        <section className="home-footer-newsletter">
          <h3>Get the good stuff</h3>
          <p>New drops, little surprises, and 10% off your first order.</p>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="home-newsletter-email">Email address</label>
            <input id="home-newsletter-email" type="email" placeholder="Your email address" required disabled={subscribed} />
            <button type="submit" aria-label="Subscribe to newsletter" disabled={subscribed}>{subscribed ? '✓' : <Icon name="arrow" size={15} />}</button>
          </form>
          <small role="status">{subscribed ? 'You’re on the list. Welcome to KIRALUX!' : 'By subscribing, you agree to our Privacy Policy.'}</small>
        </section>
      </div>
      <div className="home-footer-bottom"><span>© 2026 KIRALUX. Made for your everyday.</span><span>Thoughtfully picked, always.</span></div>
    </footer>
  );
}
