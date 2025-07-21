import React, { useContext, useEffect, useState } from "react";
import CategoryListItem from "./CategoryListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SubCategoryModal from "./CreateSubCategModal";
import ViewSubCategModal from "./ViewSubCategModal";

const CategoryList = () => {
 const navigate=useNavigate("");
  const { isUserData, setLoader,setSubCatModal,subCatModal,ViewSubCatModal, setViewSubCatModal} = useContext(AuthContext);
  const [Categories, SetCategories] = useState([]);
  const [ViewCategories, SetViewCategories] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const TOTAL_VALUES_PER_PAGE = 10;
  useEffect(() => {
    setLoader(true)
    const token = isUserData?.token;
    fetch(`${BASE_URL}/users/product-categories`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((res) => {
        SetCategories(res?.data)
        console.log(res.data, "categories");
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoader(false)
      });
  }, [isUserData]);
  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return; 
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    const totalPages = Math.ceil(Categories.length / TOTAL_VALUES_PER_PAGE);
    if (currentPageNumber === totalPages) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(Categories.slice(start, end));
  }, [currentPageNumber,Categories]);
  
  return (
    <>     
    <div className="grid grid-cols-2 gap-5" >
      <div>
      <div className="flex justify-between mb-3 items-center" >
         <h1 className="text-xl font-bold">Category</h1>
         <button 
         onClick={()=>navigate("/createcategory")}
        class={`active:scale-95 rounded-md px-6 py-2 text-sm font-medium text-white outline-none focus:ring  hover:opacity-90 bg-[#0098EA]`}
      >
        Create Category
      </button>
        </div>
    <div className="w-full overflow-x-auto h-[600px]  description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3  py-4 text-sm font-semibold"
            >
              Category Name
            </th>           
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {
            dataToDisplay?.map((item) => (
              <CategoryListItem item={item} SetViewCategories={SetViewCategories} setViewSubCatModal={setViewSubCatModal} />
            ))
          }

        </tbody>
      </table>
    </div>
    </div>
    <div>    
    <div className="flex justify-between mb-3 items-center" >
         <h1 className="text-xl font-bold">Sub Category</h1>
         <button 
        onClick={()=>setSubCatModal(!subCatModal)}
        className={`active:scale-95 rounded-md px-6 py-2 text-sm font-medium text-white outline-none focus:ring  hover:opacity-90 bg-[#0098EA]`}
      >
        Create Sub Category
      </button>
        </div>
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <table className="w-full border-collapse  text-left text-sm text-gray-500">
        <thead className="">
          <tr className="">
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
            >
              Image
            </th>           
            <th
              scope="col"
              className="px-6 lg:px-4 xl:px-2  rounded-r-lg py-4 text-sm font-semibold"
            >
              Sub Category
            </th>        
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {
            dataToDisplay?.map((item) => (              
                item?.subCategories.map((subCateg)=>(
                  <tr className="">
              <th className="px-6 lg:px-4 xl:px-3 flex gap-3  py-4 font-normal text-gray-900">
                <div className="relative h-10 w-10">
                  <img
                    className="h-full w-full rounded-md object-cover object-center"
                    src={subCateg?.image?subCateg?.image:"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                    alt=""
                  />
        
                </div>
              </th>
              <td className="px-6 lg:px-4 xl:px-3 py-4">{subCateg?.name}</td>
            </tr>
                ))
              
              
            ))
          }
       

        </tbody>
      </table>
    </div>
    </div>  
    </div>
    <div className="flex justify-end gap-3 w-full">
        <button className={`${currentPageNumber === 1?" bg-[#9fdeff]":" bg-[#0098EA]"} px-2 rounded-md w-[80px] text-white py-2 `}  onClick={goOnPrevPage}>Prev</button>
        <button className="bg-[#0098EA] px-2 rounded-md w-[80px] text-white py-2" onClick={goOnNextPage}>Next</button>
      </div> 

      <SubCategoryModal Categories={Categories} />
      <ViewSubCategModal Categories={ViewCategories} />

      </>
  );
};

export default CategoryList;
