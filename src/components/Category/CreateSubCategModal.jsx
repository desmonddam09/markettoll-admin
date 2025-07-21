import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import BASE_URL from "../../constants/BaseUrl";
const SubCategoryModal = ({Categories}) => {
  const { subCatModal, setSubCatModal, isUserData } = useContext(AuthContext);
  const token = isUserData?.token;
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(Categories[0]);
  const [categoryImages, setCategoryImages] = useState([]);
  const navigate = useNavigate("");
  const handleCategoryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCategoryImages(files);
  };

  const handleCategoryNameChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (!categoryImages.length > 0) {
      toast.error("Category Image Are Required", {
        type: "error",
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }
    const loadingToastId = toast.loading("Submitting...");
    const formData = new FormData();
    formData.append("categoryName", subCategory.name);
    
    // Ensure subcategoryNames is an array.
    const subcategoryArray = Array.isArray(category) ? category: [category];
    formData.append("subcategoryNames", JSON.stringify(subcategoryArray));
  
    // Add all images to the form data.
    for (const image of categoryImages) {
      formData.append("images", image);
    }
  
    fetch(`${BASE_URL}/admin/subcategory`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message || "Something went wrong!");
          });
        }
        return res.json();
      })
      .then((data) => {
        toast.update(loadingToastId, {
          render: "Success! Category created.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          position: "top-right",
        });
        setSubCatModal(false)
        navigate("/category");
      })
      .catch((err) => {
        toast.update(loadingToastId, {
          render: `Error: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          position: "top-right",
        });
      });
  };
  

  return (
    subCatModal && (
      <div className="w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 right-0 bottom-0 z-30 px-4">
        <div className="bg-white w-[550px] px-3 py-5 h-[650px] rounded-lg ">
          <h1 className="text-xl font-bold">Create Sub Category</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Category Name */}
            <div className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="mb-1 col-span-2">
                <label htmlFor="categName">Sub Category Name</label>
                <input
                  name="categName"
                  type="text"
                  value={category}
                  required
                  onChange={handleCategoryNameChange}
                  className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
                  placeholder="Enter Category Name"
                />
              </div>
              <div className="mb-1 col-span-2">
                <label htmlFor="categName">Select Category</label>
                <select
                  name="category"
                  required
                  onChange={(e)=>{
                    console.log(">>>>>>>>>><<<<<<<<<<<<", subCategory);
                    setSubCategory(e.target.value)}}
                  className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
                  placeholder="Enter Category Name"
                >
                    {
                        Categories?.map((item)=>(
                            <option value={item?.name}>{item?.name}</option>
                        ))
                    }
                  

                </select>
              </div>
              {/* File Input for Category */}
              <div className="mb-3 col-span-2">
                <label htmlFor="file" className="w-full">
                  <span>Category Attachment</span>
                  <div className="mt-2 text-[#0098EA] border h-[150px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
                    <FaPlus className="mr-2" size={40} />
                  </div>
                  <input
                    type="file"
                    className="hidden w-full"
                    id="file"
                    onChange={handleCategoryImageChange}
                  />
                </label>
                {categoryImages.length > 0 && (
                  <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
                    {/* {categoryImages.map((image, index) => ( */}
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(categoryImages[0])}
                        alt={`Preview`}
                        className="h-[80px] rounded-md w-auto"
                      />
                    </div>
                    {/* ))} */}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 mt-5 mb-5">
              <button
                onClick={() => {
                  setSubCatModal(!SubCatModal);
                }}
                className="bg-gray-200 text-sm h-[50px] px-5 py-2.5 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-[#0098EA] rounded-lg h-[50px] px-5 py-2.5 text-center"
              >
                Create Sub Category
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SubCategoryModal;
