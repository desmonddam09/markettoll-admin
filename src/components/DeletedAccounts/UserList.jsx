import React, { useContext, useEffect, useState } from "react";
import DeletedUserListItem from "./UserListItem";
import BASE_URL from "../../constants/BaseUrl";
import { AuthContext } from "../../context/AuthContext";

const DeletedUserList = ({filterData}) => {
  const { isUserData } = useContext(AuthContext);
  const [DeleteAcc,SetDeleteAcc]=useState([]);
  useEffect(() => {
    const token = isUserData?.token; 
    fetch(`${BASE_URL}/admin/deleted-accounts?name=${filterData}&page=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      }
    })
      .then((res) => res.json())
      .then((res) => {
        SetDeleteAcc(res?.data)
        console.log(res ,"deletedAccounts");
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [isUserData,filterData]);
  return (
    <div className="w-full overflow-x-auto h-[600px] description-scroll rounded-xl border border-gray-200 bg-white px-6 py-2 ">
       {DeleteAcc?.length > 0 ? (
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-2 py-4 text-sm font-semibold"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 lg:px-4 xl:px-2 rounded-r-lg py-4 text-sm font-semibold"
                >
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {DeleteAcc.map((item) => (
                <DeletedUserListItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center h-[80%]">
            <p className="text-center">No Record Found</p>
          </div>
        )}  
    </div>
  );
};

export default DeletedUserList;
