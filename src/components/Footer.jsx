import { useState } from 'react';
import Icon from './Icon.jsx';

const footerGroups = [
  {
    title: 'Shop',
    links: [
      { label: 'New arrivals', category: 'all' },
      { label: 'Women', category: 'women' },
      { label: 'Men', category: 'men' },
      { label: 'Kids', category: 'kids' },
      { label: 'Jewelry', category: 'jewelry' },
      { label: 'Sale', category: 'sale' },
    ],
  },
  {
    title: 'Customer care',
    links: [
      { label: 'Contact us', href: 'mailto:hello@kiralux.com' },
      { label: 'Shipping information', href: 'mailto:hello@kiralux.com?subject=Shipping%20information' },
      { label: 'Returns & exchanges', href: 'mailto:hello@kiralux.com?subject=Returns%20and%20exchanges' },
      { label: 'FAQs', href: 'mailto:hello@kiralux.com?subject=Frequently%20asked%20questions' },
    ],
  },
  {
    title: 'About KIRALUX',
    links: [
      { label: 'Our story', href: 'mailto:hello@kiralux.com?subject=About%20KIRALUX' },
      { label: 'Sustainability', href: 'mailto:hello@kiralux.com?subject=Sustainability' },
      { label: 'Privacy policy', href: 'mailto:hello@kiralux.com?subject=Privacy%20policy' },
      { label: 'Terms of service', href: 'mailto:hello@kiralux.com?subject=Terms%20of%20service' },
    ],
  },
];

export default function Footer({ onCategoryChange }) {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="store-footer">
      <div className="footer-main">
        <section className="footer-about">
          <a className="brand footer-brand" href="#" aria-label="KIRALUX home">
            <span className="brand-mark">K</span>
            <span>KIRALUX</span>
          </a>
          <p>Good finds, thoughtful details, and everyday pieces that feel like you.</p>
          <div className="footer-socials" aria-label="Follow KIRALUX">
            <a href="https://www.instagram.com/" aria-label="Instagram">ig</a>
            <a href="https://www.facebook.com/" aria-label="Facebook">f</a>
            <a href="https://www.pinterest.com/" aria-label="Pinterest">p</a>
          </div>
        </section>

        {footerGroups.map((group) => (
          <nav className="footer-links" aria-label={group.title} key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              link.category ? (
                <button key={link.label} onClick={() => {
                  onCategoryChange(link.category);
                  document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  {link.label}
                </button>
              ) : (
                <a key={link.label} href={link.href}>{link.label}</a>
              )
            ))}
          </nav>
        ))}

        <section className="footer-newsletter">
          <h2>Get the good stuff</h2>
          <p>New drops, little surprises, and 10% off your first order.</p>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" placeholder="Your email address" required disabled={subscribed} />
            <button type="submit" aria-label="Subscribe to newsletter" disabled={subscribed}>
              {subscribed ? '✓' : <Icon name="arrow" size={17} />}
            </button>
          </form>
          <span className="newsletter-note" role="status">
            {subscribed ? 'You’re on the list. Welcome to KIRALUX!' : 'By subscribing, you agree to our Privacy Policy.'}
          </span>
        </section>
      </div>

      <div className="footer-bottom">
        <span>© 2026 KIRALUX. Made for your everyday.</span>
        <div className="footer-payments" aria-label="Accepted payment methods">
          <span>VISA</span><span>mastercard</span><span>Paystack</span>
        </div>
        <a href="mailto:hello@kiralux.com"><Icon name="headset" size={14} /> Need a hand?</a>
      </div>
    </footer>
  );
}
