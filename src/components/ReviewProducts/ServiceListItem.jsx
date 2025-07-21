import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from './ConfirmDialog';
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";


const ServiceListItem = ({ item, setServiceToDisplay, serviceToDisplay }) => {
  const navigate = useNavigate("");

  const { isUserData } = useContext(AuthContext);
  const [confirmType, setConfirmType] = useState(null);
  const [manualSelectedItems, setManualSelectedItems] = useState([]);
  const token = isUserData?.token;

  const handleAccept = (id) => {
    setConfirmType('accepted');
    setManualSelectedItems([...manualSelectedItems, id]);
  }
  const handleReject = (id) => {
    setConfirmType('rejected');
    setManualSelectedItems([...manualSelectedItems, id]);
  }

  const handleConfirm = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>", manualSelectedItems);
    const response = await fetch(`${BASE_URL}/admin/manual-moderate-services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: manualSelectedItems, status: confirmType }),
    });

    if (!response.ok) {
      // Optionally, you can throw an error or handle it as needed
      throw new Error('Failed to moderate services');
    }
    console.log(response.json());
    setConfirmType(null);
    setServiceToDisplay(serviceToDisplay.filter(item => !manualSelectedItems.includes(item._id)));
    navigate(`/review-Product`);
    setManualSelectedItems([]);
  };

  return (
    <tr className="cursor-pointer">
      <td className="px-6 lg:px-4 xl:px-3 py-4 text-nowrap">
        {item.name}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4 w-48 max-w-[20rem] truncate whitespace-nowrap overflow-hidden text-ellipsis"
        onClick={() => {
          navigate(`/review-ProductDetail/${item._id}`, { state: { data: item } });
        }}
      >{item.description}</td>
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
              handleAccept(item._id);
            }}
          >
            Accept{" "}
          </button>
          <button
            className={`w-[80px] px-3 py-3 bg-[#0098EA] text-white hover:opacity-80 rounded-md text-xs`}
            onClick={(e) => {
              e.stopPropagation();
              handleReject(item._id);
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
          onCancel={() => setConfirmType(null)}
        />
      )}
    </tr>
  );
};

export default ServiceListItem;
