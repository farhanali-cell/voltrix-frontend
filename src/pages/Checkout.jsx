import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import { getCart } from "../services/cartService";
import { createCheckoutSession } from "../services/paymentService";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  useEffect(() => {
    getCart()
      .then((res) => setCart(res.data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, []);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    const required = [
      "full_name",
      "phone",
      "address_line1",
      "city",
      "state",
      "postal_code",
      "country",
    ];
    return required.every((field) => address[field].trim() !== "");
  };

  const handlePay = () => {
    setError("");

    if (!validateAddress()) {
      setError("Please fill in all required shipping address fields.");
      return;
    }

    setProcessing(true);

    createCheckoutSession(couponCode || undefined, address)
      .then((res) => {
        window.location.href = res.data.checkout_url;
      })
      .catch((err) => {
        const detail =
          err.response?.data?.detail || "Could not start checkout. Try again.";
        setError(detail);
        setProcessing(false);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 pt-28">Loading...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 pt-28 pb-16 text-center text-muted">
          Your cart is empty.
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet";

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-3xl font-semibold mb-6">Checkout</h1>

        <div className="glass-card p-5 mb-6">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 text-sm"
            >
              <span className="text-muted">
                {item.product.name} × {item.quantity}
              </span>
              <span className="text-white font-medium">
                Rs {Number(item.subtotal).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-border">
            <span className="text-base font-medium text-white">Total</span>
            <span className="text-lg font-semibold text-accent-lime">
              Rs {Number(cart.total_price).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="glass-card p-5 mb-6">
          <h2 className="font-display text-lg font-semibold mb-4">
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="full_name"
              value={address.full_name}
              onChange={handleAddressChange}
              placeholder="Full Name"
              className={`${inputClass} sm:col-span-2`}
            />
            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              placeholder="Phone Number"
              className={`${inputClass} sm:col-span-2`}
            />
            <input
              type="text"
              name="address_line1"
              value={address.address_line1}
              onChange={handleAddressChange}
              placeholder="Address Line 1"
              className={`${inputClass} sm:col-span-2`}
            />
            <input
              type="text"
              name="address_line2"
              value={address.address_line2}
              onChange={handleAddressChange}
              placeholder="Address Line 2 (optional)"
              className={`${inputClass} sm:col-span-2`}
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
              className={inputClass}
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="State/Province"
              className={inputClass}
            />
            <input
              type="text"
              name="postal_code"
              value={address.postal_code}
              onChange={handleAddressChange}
              placeholder="Postal Code"
              className={inputClass}
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted mb-1 block">
            Coupon code (optional)
          </label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="e.g. WELCOME10"
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <Button
          variant="primary"
          size="lg"
          onClick={handlePay}
          loading={processing}
          className="w-full"
        >
          {processing ? "Redirecting..." : "Pay Now"}
        </Button>
      </main>
    </div>
  );
};

export default Checkout;
