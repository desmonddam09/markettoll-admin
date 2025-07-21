import React, { useEffect } from "react";
import CategoryList from "../../components/Category/CategoryList";
import { useNavigate } from "react-router-dom";
import SubCategoryList from "../../components/SubCategory/SubCategoryList";

const SubCategory = () => {
  const navigate=useNavigate("")
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Sub Category";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex justify-between items-center" >
        <h1 className="text-xl font-bold">Sub Category</h1>
        <button 
          onClick={() => navigate("/subcreatecategory")}
          class={`active:scale-95 rounded-md px-6 py-2 text-sm font-medium text-white outline-none focus:ring  hover:opacity-90 bg-[#0098EA]`}
        >
          Create Sub Category
        </button>
        </div>
      <SubCategoryList />
    </div>
  );
};

export default SubCategory;
