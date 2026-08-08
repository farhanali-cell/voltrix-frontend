import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import ReviewsSection from "../components/reviews/ReviewsSection";
import { getProductBySlug } from "../services/productService";

const ProductReviews = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg text-white">
        <Navbar />
        <div className="max-w-3xl mx-auto px-6 pt-28 text-center text-muted">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link
          to={`/products/${product.slug}`}
          className="text-sm text-muted hover:text-accent-lime"
        >
          ← Back to product
        </Link>

        <h1 className="font-display text-2xl font-semibold text-white mt-3">
          {product.name}
        </h1>
        <p className="text-sm text-muted">Reviews for this product</p>

        <ReviewsSection
          productId={product.id}
          showAllLink={false}
          showForm={false}
        />
      </main>
    </div>
  );
};

export default ProductReviews;
