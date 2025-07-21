import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from './ConfirmDialog';
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const ProductListItem = ({ item, setProductToDisplay, productToDisplay }) => {
  const navigate = useNavigate("");

  const { isUserData } = useContext(AuthContext);
  const [confirmType, setConfirmType] = useState(null);
  const [manualSelectedItems, setManualSelectedItems] = useState([]);
  const token = isUserData?.token;

  const handleAccept = (e, id) => {
    setConfirmType('accepted');
    setManualSelectedItems([...manualSelectedItems, id]);
  }
  const handleReject = (e, id) => {
    setConfirmType('rejected');
    setManualSelectedItems([...manualSelectedItems, id]);
  }

  const handleConfirm = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>", manualSelectedItems);
    const response = await fetch(`${BASE_URL}/admin/manual-moderate-products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: manualSelectedItems, status: confirmType }),
    });

    if (!response.ok) {
      // Optionally, you can throw an error or handle it as needed
      throw new Error('Failed to moderate products');
    }
    setConfirmType(null);
    setProductToDisplay(productToDisplay.filter(item => !manualSelectedItems.includes(item._id)));
    navigate(`/review-Product`);
    setManualSelectedItems([]);
  };
  const handleCancel = async () => {
    setConfirmType(null)
  }

  return (
    <tr className="cursor-pointer">
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap"
        onClick={() => {
          navigate(`/review-ProductDetail/${item._id}`, { state: { data: item } });
        }}
      >
        {item.name}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap"
        onClick={() => {
          navigate(`/review-ProductDetail/${item._id}`, { state: { data: item } });
        }}
      >
        {item.category}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap"
        onClick={() => {
          navigate(`/review-ProductDetail/${item._id}`, { state: { data: item } });
        }}
      >
        {item.subCategory}
      </td>

      <td className="px-6 lg:px-4 xl:px-3 py-4"
        onClick={() => {
          navigate(`/review-ProductDetail/${item._id}`, { state: { data: item } });
        }}
      >${item.price}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        <div>
          <button
            className={`w-[80px] px-3 py-3 mx-2 bg-[#0098EA] text-white hover:opacity-80 rounded-md text-xs`}
            onClick={(e) => {
              e.stopPropagation();
              handleAccept(e, item._id);
            }}
          >
            Accept{" "}
          </button>
          <button
            className={`w-[80px] px-3 py-3 bg-[#0098EA] text-white hover:opacity-80 rounded-md text-xs`}
            onClick={(e) => {
              e.stopPropagation();
              handleReject(e, item._id);
            }}
          >
            Reject{" "}
          </button>
        </div>
      </td>
      {confirmType && (
        <ConfirmDialog
          type={confirmType}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </tr>
  );
};

export default ProductListItem;
