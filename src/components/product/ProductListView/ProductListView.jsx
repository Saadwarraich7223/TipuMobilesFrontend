import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap, MdOutlineShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";

import { useAppContext } from "../../../context/AppContext";
import ProductShortView from "../ProductShortView";

const ProductListView = () => {
  const { setShowProductView } = useAppContext();

  return (
    <>
      <div className="productCard  flex items-center   rounded-md shadow-sm hover:shadow-lg p-3 transition overflow-hidden ">
        <div className="imgWrapper group w-[25%] overflow-hidden rounded-md  relative ">
          <Link to={"/"}>
            <div className="img h-full  overflow-hidden">
              <img
                src="https://serviceapi.spicezgold.com/download/1742462552741_siril-georgette-pink-color-saree-with-blouse-piece-product-images-rvrk9p11sk-3-202308161432.webp"
                alt=""
                className="w-full h-full "
              />
              <img
                src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/25-medium_default/hummingbird-printed-t-shirt.jpg"
                alt=""
                className="w-full object-cover h-full absolute opacity-0 group-hover:opacity-100 group-hover:scale-105 top-0 left-0 transition duration-600 "
              />
            </div>
          </Link>
          <span className="discount flex items-center justify-center absolute top-[10px] left-[10px] bg-primary rounded-sm text-white py-1 px-2 text-[12px] font-[500]">
            20%
          </span>

          <div className="actions absolute top-[-200px] opacity-0  right-[5px] z-50 flex items-center gap-2 w-[50px] flex-col duration-400 transition-all group-hover:top-[10px] group-hover:opacity-100 ">
            <button
              className="!w-[35px] !h-[35px] !min-w-[35px] transition !bg-white hover:!bg-primary hover:!text-white !rounded-full   !text-black 
            
          "
              onClick={() => setShowProductView(true)}
            >
              <MdZoomOutMap className="text-[18px] pointer-events-none" />
            </button>
            <button
              className="!w-[35px] !h-[35px] !min-w-[35px] transition !bg-white hover:!bg-primary hover:!text-white !rounded-full   !text-black 
          "
            >
              <IoGitCompareOutline className="text-[18px] pointer-events-none" />
            </button>
            <button
              className="!w-[35px] !h-[35px] !min-w-[35px] transition !bg-white hover:!bg-primary hover:!text-white !rounded-full   !text-black 
          "
            >
              <FaRegHeart className="text-[18px] pointer-events-none" />
            </button>
          </div>
        </div>
        <div className="info p-3 w-[75%]  py-5 px-8 ">
          <h6 className="text-[15px] text-gray-800">
            <Link to={"/"} className="link transition-all">
              Gadget Zone
            </Link>
          </h6>

          <h3 className="text-[18px] mt-3 mb-3 leading-[18px] my-1 font-[500] text-black">
            <Link to={"/"} className="link">
              Apple AirPods Max Over-Ear Wireless Headphone
            </Link>
          </h3>

          <p className="text-[14px] mb-3 ">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized by the charms of pleasure of the moment, so
            blinded by desire that they cannot foresee.
          </p>

          {/* Rating Section */}
          <div className="flex items-center gap-3">
            <span className="oldPrice line-through text-gray-400 font-[500] text-[14px]">
              Rs 1200
            </span>
            <span className="newPrice font-bold  text-primary text-md">
              Rs 800
            </span>
          </div>

          <button className="!mt-4 !border !border-primary hover:!bg-black hover:!text-white hover:!border-black !px-6 !text-primary  flex items-center gap-2 !capitalize rounded-md text-sm font-bold transition-all">
            <MdOutlineShoppingCart size={20} />
            Add To cart
          </button>
        </div>
      </div>

      <ProductShortView />
    </>
  );
};

export default ProductListView;
