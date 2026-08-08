import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import { getProductRatingSummary } from "../../services/reviewService";
import { addToCart } from "../../services/cartService";

const ProductCard = ({ product }) => {
  const {
    id,
    slug,
    name,
    brand,
    price,
    discount_price,
    primary_image,
    stock,
    category,
  } = product;

  const [rating, setRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const data = await getProductRatingSummary(id);
        setRating(data.average_rating);
        setTotalReviews(data.total_reviews);
      } catch (err) {
        console.error("Failed to load rating summary:", err);
      }
    };
    if (id) fetchRating();
  }, [id]);

  const hasDiscount = discount_price && Number(discount_price) < Number(price);
  const outOfStock = stock === 0;
  const discountPercent = hasDiscount
    ? Math.round(((price - discount_price) / price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(id, 1)
      .then(() => {
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      })
      .catch(() => {})
      .finally(() => setAdding(false));
  };

  return (
    <Link
      to={`/products/${slug}`}
      className="group block glass-card overflow-hidden hover:border-accent-violet/50 transition-all duration-300"
    >
      <div className="relative aspect-square bg-card overflow-hidden">
        {primary_image ? (
          <img
            src={primary_image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            No Image
          </div>
        )}

        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-accent-lime text-bg text-[11px] font-semibold px-2 py-1 rounded-full">
            -{discountPercent}%
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 bg-bg/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-white tracking-wide uppercase">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          {category?.name && (
            <p className="text-[11px] uppercase tracking-wide text-muted">
              {category.name}
            </p>
          )}
          {brand && <p className="text-[11px] text-muted">{brand}</p>}
        </div>

        <h3 className="text-sm font-medium text-white line-clamp-2 mt-1 leading-snug">
          {name}
        </h3>

        <div className="mt-1">
          <StarRating
            rating={rating}
            totalReviews={totalReviews}
            size="text-xs"
          />
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-base font-semibold text-accent-lime">
                Rs {Number(discount_price).toLocaleString()}
              </span>
              <span className="text-xs text-muted line-through">
                Rs {Number(price).toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-white">
              Rs {Number(price).toLocaleString()}
            </span>
          )}
        </div>

        {!outOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="mt-3 w-full text-xs font-semibold py-2 rounded-full bg-accent-lime text-bg hover:opacity-90 transition disabled:opacity-60"
          >
            {added ? "Added ✓" : adding ? "Adding..." : "Add to Cart"}
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
