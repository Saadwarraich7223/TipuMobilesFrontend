import { lazy } from "react";
import Hero from "../components/Hero";
import LazySection from "../../../components/ui/LazySection";

const CategoryGrid = lazy(
  () => import("../../../features/product/components/CategoryGrid"),
);
const PopularProducts = lazy(
  () => import("../../../features/product/components/PopularProducts"),
);
const TopRatedProducts = lazy(
  () => import("../../../features/product/components/TopRatedProducts"),
);
const CustomerReviews = lazy(
  () => import("../../../features/reviews/components/CustomerReviews"),
);

const HomePage = () => {
  return (
    <div className="">
      <Hero />

      <LazySection minHeight={340}>
        <CategoryGrid />
      </LazySection>

      <LazySection minHeight={440}>
        <PopularProducts />
      </LazySection>

      <LazySection minHeight={350}>
        <TopRatedProducts />
      </LazySection>

      <LazySection minHeight={320}>
        <CustomerReviews />
      </LazySection>
    </div>
  );
};

export default HomePage;
