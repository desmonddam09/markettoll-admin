import React, { useEffect } from "react";
import CategoryList from "../../components/Category/CategoryList";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate=useNavigate("")
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Category";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
       
      <CategoryList />
    </div>
  );
};

export default Category;
