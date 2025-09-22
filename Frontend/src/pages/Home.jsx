import React from "react";
import Hero from "../components/home/Hero";
import useProducts from "../hooks/useProducts"; // custom hook
import { useGlobalContext } from "../context/GlobalContext"; // categories context
import FeaturedCategories from "../components/home/FeaturedCategories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoBanner from "../components/home/PromoBanner";
import Newsletter from "../components/home/Newsletter";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  const { products, loading } = useProducts();
  const { categories } = useGlobalContext(); // get categories from global context

  // Optional: pick first 6 as featured products
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <Hero />

      {/* Categories */}
      <FeaturedCategories />

      <FeaturedProducts />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
