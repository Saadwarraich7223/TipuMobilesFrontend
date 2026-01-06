import { useEffect, useState, lazy, useMemo } from "react";
import MainBanner from "../../components/common/Banners/MainBanner";
import LazySection from "../../components/common/Lazysection/LazySection";
import { useFlashSales } from "../../queries/flashSales";

const CategorySlider = lazy(() =>
  import("../../components/common/CategorySlider/CategorySlider")
);
const PopularProducts = lazy(() =>
  import("../../components/common/PopularProducts/PopularProducts")
);
const TopRatedProducts = lazy(() =>
  import("../../components/common/TopRatedProducts/TopRatedProducts")
);
const CustomerReviews = lazy(() =>
  import("../../components/common/CustomerReviews/CustomerReviews")
);
const FlashSale = lazy(() =>
  import("../../components/common/FlashSaleCard/FlashSale")
);

const HomePage = () => {
  const { data: flashSales = [], isLoading } = useFlashSales();

  const [loadFlashSale, setLoadFlashSale] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => setLoadFlashSale(true));
    } else {
      setTimeout(() => setLoadFlashSale(true), 500);
    }
  }, []);

  const activeSale = useMemo(() => {
    const now = Date.now();
    return flashSales.find((sale) => new Date(sale.endTime).getTime() > now);
  }, [flashSales]);

  return (
    <>
      <MainBanner />

      {loadFlashSale && activeSale && (
        <LazySection minHeight={420}>
          <FlashSale sale={activeSale} loading={isLoading} />
        </LazySection>
      )}

      <LazySection minHeight={180}>
        <CategorySlider />
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
    </>
  );
};

export default HomePage;
