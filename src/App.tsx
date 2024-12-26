import HomePage from "./pages/HomePage";
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginComp";
import AdminLogin from "./pages/AdminLogin";
import { Amplify } from 'aws-amplify';
import outputs from "../amplify_outputs.json";
import { useDispatch } from "react-redux";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { isAuthenticated, isNotAuthenticated } from "./state/authdetails/AuthDetails";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./components/admin/AddProduct";
import AddCategories from "./components/admin/AddCategories";
import Layout from "./components/layout";
import HomeLayout from "./components/admin/HomeLayout";
import ProductListPage from "./pages/productListPage";
import ProductView from "./components/productView";



Amplify.configure(outputs);

function App() {
  const dispath = useDispatch();
  const { authStatus,} = useAuthenticator(context => [context.authStatus]);
  const {  user } = useAuthenticator(context => [context.user]);
  if (authStatus === "authenticated") {
    dispath(isAuthenticated(user.username),
    );
  }
  if(authStatus === "unauthenticated") {
    dispath(isNotAuthenticated());
  } 
  
   if (authStatus === "configuring") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-500 font-semibold">Loading...</p>
      </div>
    );
  }
  
  return (
    <Router>
      <Routes>
        //appbar and fotter layout
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productListPage/:categoryId" element={<ProductListPage />} />
          <Route path="/productview/:productId" element={<ProductView />} />
        </Route>
        //appbar and fotter layout

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-categories" element ={<AddCategories />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/home-layout" element={<HomeLayout />} />
        
        //ProtectedRoutes
        <Route element={<ProtectedRoutes />} >
        </Route>
        //ProtectedRoutes
      </Routes>
      </Router>
  );
}

export default App;
