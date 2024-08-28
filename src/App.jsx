import { useState } from "react";
import "./App.css";
import Register from "./Components/Register/Register";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import AuthContextProvider from "./Contexts/AuthContext";
import Main from "./Components/Main/Main";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/NotFound/NotFound";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import AuthRoutes from "./Components/protectAuthRoutes/AuthRoutes";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Cart from "./Components/Cart/Cart";
import CartDataProvider from "./Contexts/CartDataContext";
import SubCategoryProducts from "./Components/SubCategoryProducts/SubCategoryProducts";
import CheckOut from "./Components/CheckOut/CheckOut";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import WishList from "./Components/WishList/WishList";
import WishListDataProvider from "./Contexts/WishListData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


export default function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "SubCategoryProducts/:id",
          element: (
            <ProtectedRoute>
              <SubCategoryProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "WishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "CheckOut/:id",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "BrandProducts/:id",
          element: (
            <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "Register",
          element: (
            <AuthRoutes>
              <Register />
            </AuthRoutes>
          ),
        },
        {
          path: "Login",
          element: (
            <AuthRoutes>
              <Login />
            </AuthRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  const queryCLient=new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryCLient}>
        <WishListDataProvider>
          <CartDataProvider>
            <AuthContextProvider>
              <RouterProvider router={router} />
            </AuthContextProvider>
          </CartDataProvider>
        </WishListDataProvider>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  );
}
