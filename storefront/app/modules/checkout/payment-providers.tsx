export function PaymentProviders() {
  return (
    <ul className="flex justify-center gap-2">
      {Object.entries(paymentProviders).map(([name, href]) => (
        <img key={name} src={href} className="h-6 rounded border" alt={name} />
      ))}
    </ul>
  );
}

const paymentProviders = {
  Paystack: "/assets/paystack-icon.png",
  // Opay: "/assets/opay-icon.png",
  MasterCard: "/assets/mastercard-icon.png",
  Visa: "/assets/visa-icon.png",
};
