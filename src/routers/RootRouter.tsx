import App from "@/App";
import DashboardPage from "@/pages/dashboard/dashboard-page";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "@/middlewares/ProtectedRoute";
import ErrorPage from "@/Error-Page";
import LoginPage from "@/pages/auth/Login-Page";
import {
ProductsLayout,
  SalesLayout,
  StoreManagementLayout,
  SettingsLayout,
} from "@/layouts/Sidbar_Layout";
import ProductAddPage from "@/pages/products/add-new/product-add-page";

const rootRouter = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/products",
        element: <ProductsLayout />, // Parent layout for Products
        children: [
          { path: "add-new", element: <ProductAddPage /> },
          { path: "all", element: <div>All Products Page</div> },
          { path: "category", element: <div>Category Page</div> },
          { path: "brand", element: <div>Brand Page</div> },
          { path: "reviews", element: <div>Product Reviews Page</div> },
          { path: "colors", element: <div>Colors Page</div> },
        ],
      },
      {
        path: "/sales",
        element: <SalesLayout />, // Parent layout for Sales
        children: [
          { path: "orders", element: <div>All Orders Page</div> },
          { path: "refunds", element: <div>Customer Refunds Page</div> },
        ],
      },
      {
        path: "/store",
        element: <StoreManagementLayout />, // Parent layout for Store Management
        children: [
          { path: "review", element: <div>Review Page</div> },
          { path: "postal-code", element: <div>Postal Code Page</div> },
          { path: "earnings", element: <div>Store Earnings Page</div> },
          { path: "overview", element: <div>Product Overview Page</div> },
          { path: "commission", element: <div>Store Commission Page</div> },
        ],
      },
      {
        path: "/settings",
        element: <SettingsLayout />,
        children: [{ path: "shipping", element: <div>Shipping Page</div> }],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default rootRouter;
