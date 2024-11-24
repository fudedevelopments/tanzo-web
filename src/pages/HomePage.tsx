import Categories from "../components/Categories";
import ProductListing from "../components/ProductsListing";
import EngravedProductListing from "../components/EngravedProductList";
import ScrollingBanner from "../components/ScrollingBanner";
import TopNavigationBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";

const HomePage = () => {
  const { authStatus, user, signOut } = useAuthenticator((context) => [context.authStatus, context.user]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (authStatus !== "authenticated") {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [authStatus]);

  return (
    <>
      <TopNavigationBar username={authStatus === "authenticated" ? user.username : null} onSignOut={signOut} />
      <div className="mt-5" />
      <ScrollingBanner />
      <Categories />
      <ProductListing />
      <EngravedProductListing />
      <Footer />

      {/* Conditional rendering for login popup */}
      {showLoginPopup && authStatus !== "authenticated" && (
        <div className="login-popup">
          <h2>Please Log In</h2>
          <button onClick={() => setShowLoginPopup(false)}>Close</button>
          {/* Include your login form or button to trigger login flow */}
        </div>
      )}
    </>
  );
};

export default HomePage;
