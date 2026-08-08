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

  useEffect(() => {
    getCart()
      .then((res) => setCart(res.data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  }, []);

  const handlePay = () => {
    setError("");
    setProcessing(true);

    createCheckoutSession(couponCode || undefined)
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

        <div className="mb-4">
          <label className="text-sm text-muted mb-1 block">
            Coupon code (optional)
          </label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="e.g. WELCOME10"
            className="w-full bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
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
