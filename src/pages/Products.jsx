import React, { useEffect, useState } from "react";
import ProductList from "../components/Product/ProductList";
import { ProductFilter } from "../components/Product/Filter";
export default function Products() {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.title = "Market-Toll - Products";
    };
    scrollToTop();
  }, []);
  const [filterData, setFilterData] = useState([]);
  const [productLength, setFilterLength] = useState(0);

  console.log(filterData, "filterData");
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-xl font-bold">
        Products{" "}
        <span className="text-[#0098EA] text-sm">({productLength})</span>
      </h1>
      <ProductFilter setFilterData={setFilterData} />
      <ProductList filterData={filterData} setFilterLength={setFilterLength} />
    </div>
  );
}
