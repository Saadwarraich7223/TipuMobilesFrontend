import { useEffect, useState } from "react";
import { lazy } from "react";

import MainBanner from "../../components/common/Banners/MainBanner";

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

import flashSalesApi from "../../api/flashSales";
import LazySection from "../../components/common/Lazysection/LazySection";

const HomePage = () => {
  const [flashSales, setFlashSales] = useState([]);
  const [activeFlashSales, setActiveFlashSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await flashSalesApi.getFlashSales();
        setFlashSales(res);
      } catch (err) {
        console.error("Flash sale fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSale();
  }, []);

  useEffect(() => {
    const filterActiveSales = () => {
      const now = new Date();
      const active = flashSales.filter((sale) => new Date(sale.endTime) > now);
      setActiveFlashSales(active);
    };

    filterActiveSales(); // initial run
    const interval = setInterval(filterActiveSales, 10000);
    return () => clearInterval(interval);
  }, [flashSales]);

  return (
    <div className="overflow-hidden">
      <MainBanner />

      {activeFlashSales.length === 0 ? (
        <></>
      ) : (
        activeFlashSales.map((sale) => (
          <LazySection>
            <FlashSale key={sale._id} sale={sale} loading={loading} />
          </LazySection>
        ))
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
    </div>
  );
};

export default HomePage;
