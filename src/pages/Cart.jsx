import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCart = () => {
    setLoading(true);
    getCart()
      .then((res) => setCart(res.data))
      .catch(() => setCart(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = (itemId, quantity) => {
    setUpdatingId(itemId);
    updateCartItem(itemId, quantity)
      .then(() => fetchCart())
      .finally(() => setUpdatingId(null));
  };

  const handleRemove = (itemId) => {
    setUpdatingId(itemId);
    removeCartItem(itemId)
      .then(() => fetchCart())
      .finally(() => setUpdatingId(null));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28">Loading cart...</div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 text-center">
          <p className="text-muted mb-4">Your cart is empty.</p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <h1 className="font-display text-3xl font-semibold mb-6">
          Your <span className="gradient-text">Cart</span>
        </h1>

        <div className="glass-card p-5">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
              updating={updatingId === item.id}
            />
          ))}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-base font-medium text-white">Total</span>
            <span className="text-xl font-semibold text-accent-lime">
              Rs {Number(cart.total_price).toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/checkout")}
          className="w-full mt-6"
        >
          Proceed to Checkout
        </Button>
      </main>
    </div>
  );
};

export default Cart;
