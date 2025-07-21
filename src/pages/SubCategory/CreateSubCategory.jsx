import React, { useEffect } from 'react'
import CategoryCreate from '../../components/Category/CreateCategory';
import { NavLink } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import SubCategoryCreate from '../../components/SubCategory/CreateSubCategory';
const CreateSubCategory = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Categories";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
        <div className="flex justify-between items-center" >
           <h1 className="text-xl font-bold flex items-center "><NavLink to={'/subcategory'}><IoMdArrowBack size={25} className='me-2'  /></NavLink> Create Sub Category</h1>
         </div>  
            <SubCategoryCreate/>
    </div>
  );
};

export default CreateSubCategory;
