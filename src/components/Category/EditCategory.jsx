import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

export default function CategoryEdit() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };


  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white px-6 py-2 ">
      <form>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="mb-1 col-span-2">
            <label htmlFor="categName">Category Name</label>
            <input
            name="categName"
            type="text"
            autoComplete="off"
            className="w-full text-sm border mt-2 border-gray-200 px-4 py-2 rounded-md shadow-sm outline-none focus:border-[#0085FF] focus:ring focus:ring-[#0098EA] focus:ring-opacity-50 text-sm"
            placeholder="Enter Category Name"
          />
          </div>
          <div className="mb-3 col-span-2 ">
            <label htmlFor="file" className="w-full" >
              <span className="" >Attachment</span>
              <div className="mt-2 text-[#0098EA] border lg:h-[200px]  rounded-md justify-center border-dashed border-[#0098EA]  flex items-center cursor-pointer">
                <FaPlus className="mr-2" size={25} />
              </div>
              <input
                type="file"
                className="hidden w-full"
                id="file"
                multiple
                onChange={handleImageChange}
              />
            </label>
            {images.length > 0 && (
               <div className="image-preview flex items-center flex-wrap mt-2 gap-2">
               {images.map((image, index) => (
                 <div key={index} className="relative">
                   <img
                     src={URL.createObjectURL(image)}
                     alt={`Preview ${index}`}
                     className="h-[100px] rounded-md w-auto"
                   />     
                   <button
                     onClick={() => handleImageDelete(index)}
                     className="absolute top-0 right-0 bg-[#ff4d4d] text-white rounded-full p-1 m-1"
                     style={{ fontSize: '16px', cursor: 'pointer' }}
                   >
                     <FaTimes />
                   </button>
                 </div>
               ))}
             </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 mt-5 mb-5">
          <button
            type="submit"
            className="text-white bg-[#0098EA] rounded-lg  h-[50px] px-5 py-2.5 text-center"
          >
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
