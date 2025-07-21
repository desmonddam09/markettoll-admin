import Auth from "../components/Global/Auth";
import Layout from "../components/Global/Layout";
import UserInfo from "../components/UserDetails/UserInfo";
import Affiliate from "../pages/Affiliate/Affiliate";
import AffiliateDetail from "../pages/Affiliate/AffiliateDetail";
import PendingRequest from "../pages/Affiliate/PendingRequest";
import Category from "../pages/Category/Category";
import CreateCategory from "../pages/Category/CreateCategory";
import EditCategory from "../pages/Category/EditCategory";
import Chat from "../pages/Chat";
import Customer from "../pages/CustomerSupport";
import Dashboard from "../pages/Dashboard";
import DeletedAccounts from "../pages/DeletedAccounts";
import Goal from "../pages/Goals/Goal";
import GoalAchiever from "../pages/Goals/GoalAchiever";
import InActiveUser from "../pages/InActiveUser";
import Login from "../pages/Login";
import Notifications from "../pages/Notifications";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import Plans from "../pages/Plans";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import ReportDetails from "../pages/ReportDetails";
import Reports from "../pages/Reports";
import ResetPassword from "../pages/ResetPassword";
import Revenue from "../pages/Revenue";
import ReviewProduct from "../pages/ReviewProduct";
import ReviewProductDetail from "../pages/ReviewProductDetail";
import ReviewServiceDetail from "../pages/ReviewServiceDetail";
import CreateSubCategory from "../pages/SubCategory/CreateSubCategory";
import EditSubCategory from "../pages/SubCategory/EditSubCategory";
import SubCategory from "../pages/SubCategory/SubCategory";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyOtp from "../pages/VerifyOtp";

export const AppRoutes = [
  {
    Title: "Dashboard Page",
    url: "/",
    page: <Layout pages={<Dashboard />} />,
    isPrivate: true,
  },
  {
    Title: "Subscription Plans Page",
    url: "/plans",
    page: <Layout pages={<Plans />} />,
    isPrivate: true,
  },
  {
    Title: "Users Page",
    url: "/users",
    page: <Layout pages={<Users />} />,
    isPrivate: true,
  },
  {
    Title: "InActive Users Page",
    url: "/inactive",
    page: <Layout pages={<InActiveUser />} />,
    isPrivate: true,
  },
  {
    Title: "Products",
    url: "/products",
    page: <Layout pages={<Products />} />,
    isPrivate: true,
  },
  {
    Title: "Products",
    url: "/productDetail/:id",
    page: <Layout pages={<ProductDetail />} />,
    isPrivate: true,
  },
  {
    Title: "Review Products",
    url: "/review-product",
    page: <Layout pages={<ReviewProduct />} />,
    isPrivate: true,
  },
  {
    Title: "Review Products",
    url: "/review-productDetail/:id",
    page: <Layout pages={<ReviewProductDetail />} />,
    isPrivate: true,
  },
  {
    Title: "Review Service",
    url: "/review-serviceDetail/:id",
    page: <Layout pages={<ReviewServiceDetail />} />,
    isPrivate: true,
  },
  {
    Title: "Order Page",
    url: "/order",
    page: <Layout pages={<Order />} />,
    isPrivate: true,
  },
  {
    Title: "Order Page",
    url: "/OrderDetail/:id",
    page: <Layout pages={<OrderDetail />} />,
    isPrivate: true,
  },
  
  {
    Title: "Category",
    url: "/category",
    page: <Layout pages={<Category />} />,
    isPrivate: true,
  },
  {
    Title: "Affiliate",
    url: "/affiliate",
    page: <Layout pages={<Affiliate />} />,
    isPrivate: true,
  },
  {
    Title: "Goal",
    url: "/goal",
    page: <Layout pages={<Goal />} />,
    isPrivate: true,
  },
  {
    Title: "Goal",
    url: "/achiever",
    page: <Layout pages={<GoalAchiever />} />,
    isPrivate: true,
  },
  {
    Title: "Affiliate",
    url: "/pending-request",
    page: <Layout pages={<PendingRequest />} />,
    isPrivate: true,
  },
  {
    Title: "Affiliate",
    url: "/affiliate/:id",
    page: <Layout pages={<AffiliateDetail />} />,
    isPrivate: true,
  },
  {
    Title: "chat",
    url: "/chat",
    page: <Layout pages={<Chat />} />,
    isPrivate: true,
  },
  {
    Title: "CreateCategory",
    url: "/createcategory",
    page: <Layout pages={<CreateCategory />} />,
    isPrivate: true,
  },
  {
    Title: "EditCategory",
    url: "/editcategory",
    page: <Layout pages={<EditCategory />} />,
    isPrivate: true,
  },


  {
    Title: "SubCategory",
    url: "/subcategory",
    page: <Layout pages={<SubCategory />} />,
    isPrivate: true,
  },
  {
    Title: "SubCreateCategory",
    url: "/subcreatecategory",
    page: <Layout pages={<CreateSubCategory />} />,
    isPrivate: true,
  },
  {
    Title: "SubEditCategory",
    url: "/subeditcategory",
    page: <Layout pages={<EditSubCategory />} />,
    isPrivate: true,
  },
  {
    Title: "Customer",
    url: "/customer",
    page: <Layout pages={<Customer />} />,
    isPrivate: true,
  },

  {
    Title: "Deleted",
    url: "/deleted",
    page: <Layout pages={<DeletedAccounts />} />,
    isPrivate: true,
  },
  {
    Title: "User Information Page",
    url: "/user/:id",
    page: <Layout pages={<UserInfo />} />,
    isPrivate: true,
  },
  {
    Title: "Subscriptions Page",
    url: "/revenue",
    page: <Layout pages={<Revenue />} />,
    isPrivate: true,
  },
  {
    Title: "Notifications Page",
    url: "/notifications",
    page: <Layout pages={<Notifications />} />,
    isPrivate: true,
  },
  {
    Title: "Reports Page",
    url: "/reports",
    page: <Layout pages={<Reports />} />,
    isPrivate: true,
  },
  {
    Title: "Report Details Page",
    url: "/reports/1234",
    page: <Layout pages={<ReportDetails />} />,
    isPrivate: true,
  },
  {
    Title: "Dashboard Page",
    url: "/login",
    page: <Login />,
    isPrivate: false,
  },
  {
    Title: "Dashboard Page",
    url: "/verify-email",
    page: <VerifyEmail />,
    isPrivate: false,
  },
  {
    Title: "Dashboard Page",
    url: "/verify-otp",
    page: <VerifyOtp />,
    isPrivate: false,
  },
  {
    Title: "Dashboard Page",
    url: "/reset-password",
    page: <ResetPassword />,
    isPrivate: false,
  },
];
