import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";
import ReviewsSection from "../components/reviews/ReviewsSection";
import { getProductBySlug } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then((res) => {
        setProduct(res.data);
        const primary =
          res.data.images?.find((img) => img.is_primary) ||
          res.data.images?.[0];
        setActiveImage(primary?.image || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => {
    setAdding(true);
    setMessage("");
    addToCart(product.id, quantity)
      .then(() => setMessage("Added to cart."))
      .catch(() => setMessage("Could not add to cart. Try again."))
      .finally(() => setAdding(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-28">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 pt-28 text-center text-muted">
          Product not found.
        </div>
      </div>
    );
  }

  const {
    name,
    brand,
    description,
    price,
    discount_price,
    stock,
    specs,
    category,
    images,
    seller_name,
  } = product;

  const hasDiscount = discount_price && Number(discount_price) < Number(price);
  const outOfStock = stock === 0;

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square glass-card overflow-hidden">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted">
                  No Image
                </div>
              )}
            </div>

            {images?.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img.image)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      activeImage === img.image
                        ? "border-accent-lime"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={img.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {category?.name && (
              <p className="text-xs uppercase tracking-wide text-muted mb-1">
                {category.name}
              </p>
            )}
            <h1 className="font-display text-2xl font-semibold text-white">
              {name}
            </h1>
            <p className="text-sm text-muted mt-1">{brand}</p>

            <div className="mt-4 flex items-baseline gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-semibold text-accent-lime">
                    Rs {Number(discount_price).toLocaleString()}
                  </span>
                  <span className="text-base text-muted line-through">
                    Rs {Number(price).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-white">
                  Rs {Number(price).toLocaleString()}
                </span>
              )}
            </div>

            <p
              className={`mt-2 text-sm ${
                outOfStock ? "text-red-400" : "text-accent-lime"
              }`}
            >
              {outOfStock ? "Out of stock" : `In stock (${stock} available)`}
            </p>

            {description && (
              <p className="mt-4 text-sm text-muted leading-relaxed">
                {description}
              </p>
            )}

            {specs && Object.keys(specs).length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white mb-2">
                  Specifications
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-border">
                        <td className="py-1.5 pr-4 text-muted capitalize">
                          {key}
                        </td>
                        <td className="py-1.5 text-white">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {seller_name && (
              <p className="mt-4 text-xs text-muted">Sold by {seller_name}</p>
            )}

            {!outOfStock && (
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-muted hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                    className="px-3 py-2 text-muted hover:text-white"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  loading={adding}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
              </div>
            )}

            {message && <p className="mt-3 text-sm text-muted">{message}</p>}
          </div>
        </div>

        <ReviewsSection productId={product.id} productSlug={product.slug} />
      </main>
    </div>
  );
};

export default ProductDetail;
