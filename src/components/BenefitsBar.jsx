import Icon from './Icon.jsx';

const benefits = [
  { icon: 'shield', title: 'Secure Payment', detail: '100% secure payment' },
  { icon: 'return', title: 'Easy Returns', detail: '30-day return policy' },
  { icon: 'headset', title: '24/7 Support', detail: 'Dedicated support team' },
  { icon: 'star', title: 'Trusted by Thousands', detail: '4.8 average rating' },
];

export default function BenefitsBar() {
  return (
    <section className="benefits-bar" id="support">
      {benefits.map((benefit) => (
        <div className="benefit" key={benefit.title}>
          <Icon name={benefit.icon} size={21} />
          <span><b>{benefit.title}</b><small>{benefit.detail}</small></span>
        </div>
      ))}
    </section>
  );
}
