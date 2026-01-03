import { useEffect, useState, lazy } from "react";
import MainBanner from "../../components/common/Banners/MainBanner";
import LazySection from "../../components/common/Lazysection/LazySection";
import flashSalesApi from "../../api/flashSales";

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
  const [activeSale, setActiveSale] = useState(null);
  const [loadFlashSale, setLoadFlashSale] = useState(false);

  useEffect(() => {
    requestIdleCallback(() => {
      setLoadFlashSale(true);
    });
  }, []);

  useEffect(() => {
    if (!loadFlashSale) return;

    const fetchFlashSale = async () => {
      try {
        const res = await flashSalesApi.getFlashSales();
        const now = Date.now();

        const active = res.find(
          (sale) => new Date(sale.endTime).getTime() > now
        );

        setActiveSale(active || null);
      } catch (err) {
        console.error("Flash sale fetch failed:", err);
      }
    };

    fetchFlashSale();
  }, [loadFlashSale]);

  return (
    <>
      <MainBanner />

      {loadFlashSale && activeSale && (
        <LazySection minHeight={420}>
          <FlashSale sale={activeSale} />
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
