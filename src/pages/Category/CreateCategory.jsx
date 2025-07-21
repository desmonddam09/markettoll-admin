import React, { useEffect } from 'react'
import CategoryCreate from '../../components/Category/CreateCategory';
import { NavLink } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
const CreateCategory = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0,0);
      document.title = "Market-Toll - Create Category";
    };
    scrollToTop()
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-4">
        <div className="flex justify-between items-center" >
           <h1 className="text-xl font-bold flex items-center "><NavLink to={'/category'}><IoMdArrowBack size={25} className='me-2'  /></NavLink> Create Category</h1>
         </div>  
            <CategoryCreate/>
    </div>
  );
};

export default CreateCategory;
