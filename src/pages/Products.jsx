import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import ProductGrid from "../components/product/ProductGrid";
import { getProducts, getCategories } from "../services/productService";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [ordering, setOrdering] = useState("");

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  // URL me category change ho (e.g. Home.jsx se naya link click) to state sync karo
  useEffect(() => {
    const urlCategory = searchParams.get("category") || "";
    setCategory(urlCategory);
  }, [searchParams]);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    setLoading(true);

    const params = {};
    if (search) params.search = search;
    if (category) params.category__slug = category;
    if (ordering) params.ordering = ordering;

    const timer = setTimeout(() => {
      getProducts(params)
        .then((res) => setProducts(res.data))
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category, ordering]);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-semibold">
            All <span className="gradient-text">Products</span>
          </h1>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
          />

          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-violet"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="bg-card border border-border rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-violet"
          >
            <option value="">Sort by</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-created_at">Newest First</option>
          </select>
        </div>

        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  );
};

export default Products;
