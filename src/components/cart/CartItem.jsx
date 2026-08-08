const CartItem = ({ item, onUpdateQuantity, onRemove, updating = false }) => {
  const { id, product, quantity, subtotal } = item;
  const { name, brand, price, discount_price, primary_image, stock } = product;

  const hasDiscount = discount_price && Number(discount_price) < Number(price);
  const unitPrice = hasDiscount ? discount_price : price;

  return (
    <div className="flex gap-4 py-4 border-b border-border last:border-0">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-card flex-shrink-0">
        {primary_image ? (
          <img
            src={primary_image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted">{brand}</p>
        <h4 className="text-sm font-medium text-white truncate">{name}</h4>
        <p className="text-sm text-muted mt-1">
          Rs {Number(unitPrice).toLocaleString()} each
        </p>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-border rounded-full">
            <button
              onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
              disabled={updating || quantity <= 1}
              className="px-2.5 py-1 text-muted hover:text-white disabled:opacity-40"
            >
              -
            </button>
            <span className="px-3 text-sm text-white">{quantity}</span>
            <button
              onClick={() =>
                onUpdateQuantity(id, Math.min(stock, quantity + 1))
              }
              disabled={updating || quantity >= stock}
              className="px-2.5 py-1 text-muted hover:text-white disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(id)}
            disabled={updating}
            className="text-xs text-red-400 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-sm font-semibold text-white whitespace-nowrap">
        Rs {Number(subtotal).toLocaleString()}
      </div>
    </div>
  );
};

export default CartItem;
