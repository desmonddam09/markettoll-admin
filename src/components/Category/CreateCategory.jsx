import React, { useContext, useState } from "react";
import { FaTimes, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DesClaimerModal from "./DesclaimerModal";

export default function CategoryCreate() {
  const { isUserData, setDisclaimerModal } = useContext(AuthContext);
  const token = isUserData?.token;
  const [category, setCategory] = useState("");
  const [categoryImages, setCategoryImages] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate("");

  const handleCategoryImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCategoryImages(files);
  };

  const handleCategoryNameChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    console.log("<<<<<<<<<<<<<<<<<<<=============>>>>>>>>>>>>>>>");
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
    formData.append("categoryName", category);
    for (const image of categoryImages) {
      formData.append("images", image);
    }

    fetch(`${BASE_URL}/admin/category`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(async (res) => {
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
    <>
    
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white px-6 py-2">
      <form onSubmit={(e)=>{
        e.preventDefault();
        setDisclaimerModal(true)
        }}>
        {/* Category Name */}
        <div className="cloning-element mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-1 col-span-2">
            <label htmlFor="categName">Category Name</label>
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
          {/* File Input for Category */}
          <div className="mb-3 col-span-2">
            <label htmlFor="file" className="w-full">
              <span>Category Attachment</span>
              <div className="mt-2 text-[#0098EA] border lg:h-[200px] rounded-md justify-center border-dashed border-[#0098EA] flex items-center cursor-pointer">
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
                    className="h-[100px] rounded-md w-auto"
                  />
                </div>
                {/* ))} */}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5 mt-5 mb-5">
          <button
            type="submit"
            className="text-white bg-[#0098EA] rounded-lg h-[50px] px-5 py-2.5 text-center"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
    <DesClaimerModal handleSubmit={handleSubmit} />
    </>
  );
}
