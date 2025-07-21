import React from "react";
const SubscriptionListItem = ({ item, FilterMonthUser }) => {
  console.log(item, "itemss");

  // Ensure item?.userDetails is defined and has at least one element
  const userName =
    FilterMonthUser && item?.userDetails?.length > 0
      ? item?.userDetails[0]?.name
      : item?.name;
  const userEmail =
    FilterMonthUser && item?.userDetails?.length > 0
      ? item?.userDetails[0]?.email?.value
      : item?.email?.value;

  // Ensure item?.subscriptionPlan is defined
  const subscriptionPlanName = FilterMonthUser
    ? item?.name
    : item?.subscriptionPlan?.name;
  const subscriptionPlanPrice = FilterMonthUser
    ? item?.price
    : item?.subscriptionPlan?.price;
  const subscriptionPlanStatus = item?.subscriptionPlan?.status;
  const purchasedAt = FilterMonthUser
    ? item?.purchasedAt
    : item?.subscriptionPlan?.purchasedAt;

  return (
    <tr>
      <td className="px-6 lg:px-4 xl:px-3 flex gap-3 py-4 font-normal text-gray-900">
        <div className="text-sm">
          <div className="font-medium text-gray-700">{userName}</div>
          <div className="text-gray-400">{userEmail}</div>
        </div>
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{subscriptionPlanName}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{subscriptionPlanPrice}</td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">
        {subscriptionPlanStatus && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            {subscriptionPlanStatus}
          </span>
        )}
      </td>
      <td className="px-6 lg:px-4 xl:px-3 py-4">{purchasedAt}</td>
    </tr>
  );
};

export default SubscriptionListItem;
