import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LuArrowUpDown } from "react-icons/lu";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function ViewRefferal({ refferals }) {
  const { isUserData, setLoader, loader } = useContext(AuthContext);
  const navigate = useNavigate("");
  return (
    <div>
      <div className="flex flex-col mt-5">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="">
                  <tr className="">
                    <th
                      scope="col"
                      className="text-start px-6 lg:px-4 xl:px-3 rounded-s-lg py-4 text-sm font-semibold"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-start px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-start px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-start px-6 lg:px-4 xl:px-2  py-4 text-sm font-semibold"
                    >
                      Status
                    </th>

                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {refferals && refferals?.length > 0 ? (
                    refferals.map((item, i) => (
                      <tr key={i} className="cursor-pointer">
                        <th
                          onClick={() =>
                            navigate(`/user/${item?._id}`, {
                              state: { data: item },
                            })
                          }
                          className="px-6 lg:px-4 xl:px-3 flex gap-3 items-center py-4 font-normal text-gray-900"
                        >
                          <div className="relative h-10 w-10">
                            <img
                              className="h-full w-full rounded-full object-cover object-center"
                              src={
                                item?.profileImage
                                  ? item?.profileImage
                                  : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              }
                              alt=""
                            />
                          </div>
                          <div className="text-sm">
                            <div className="font-medium text-gray-700">
                              {item?.name}
                            </div>
                          </div>
                        </th>
                        <td className="px-6 lg:px-4 xl:px-3 py-4">
                          {item?.email?.value}
                        </td>
                        <td className="px-6 lg:px-4 xl:px-3 py-4">
                          {item?.phoneNumber?.code + item?.phoneNumber?.value}
                        </td>
                        <td className="px-6 lg:px-4 xl:px-3 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full  ${
                              item.adminStatus == "active"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }  px-2 py-1 text-xs font-semibold `}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                item.adminStatus == "active"
                                  ? " bg-green-600"
                                  : "bg-red-600"
                              }`}
                            ></span>
                            {item?.adminStatus}
                          </span>
                        </td>
                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center px-6 py-4 text-sm text-gray-500"
                      >
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
