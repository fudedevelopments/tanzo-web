import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Snackbar,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/store";
import "@fontsource/dm-sans";
import Hero from "../components/Hero";
import axios from "axios";
import ProductListing from "../components/ProductsListing";
import TanzoBenefits from "../components/tanzobenefit";
import CategoryList from "../components/CategoriesList";
import NormalLoading from "../components/smallcomponents/normalindicator";

const HomePage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  const [showActionBar, setShowActionBar] = useState(false);

  const productListRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const {
    data: homepagequery,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["homePageProducts"],
    queryFn: async (): Promise<any> => {
      try {
        const response = await axios.get("https://7usnydoqmwkg4xe55qt4huf3xy0pyezv.lambda-url.ap-south-1.on.aws/");
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (!auth) {
      const timer = setTimeout(() => {
        setShowActionBar(true);
      }, 10000); // Show the action bar after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [auth]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleCloseActionBar = () => {
    setShowActionBar(false);
  };

  return (
    <>
      {isProductsLoading ? (
          <NormalLoading />
      ) : isProductsError ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
          textAlign="center"
        >
          <Typography variant="h6" color="error">
            Something went wrong. Please contact support.
          </Typography>
        </Box>
      ) : (
        <>
          <div className="mt-0" />
          <div
            className="absolute inset-0 w-full h-full overflow-hidden spline-container"
            style={{ clipPath: "inset(0px 0px 70px 0px)", top: -100 }}
          >
            {/* <Spline
              scene="https://prod.spline.design/PI0JLDkBeve1P6eP/scene.splinecode"
              className="spline"
            /> */}
          </div>
          <Hero onClick={scrollToProducts} />
          <Box style={{ marginTop: "-200px" }}>
            <TanzoBenefits />
            {/* categories */}
            {homepagequery?.data?.categories ? (
              <CategoryList category={homepagequery?.data?.categories} />
            ) : (
              <Typography variant="body1">No products found.</Typography>
            )}
            {/* home products */}
            <div ref={productListRef}>
              {homepagequery?.data?.homePageProducts ? (
                <ProductListing homepageproducts={homepagequery.data.homePageProducts} />
              ) : (
                <Typography variant="body1">No products found.</Typography>
              )}
            </div>
          </Box>
        </>
      )}

      {/* Action Bar for Non-Authenticated Users */}
      {!auth && (
        <Snackbar
          open={showActionBar}
          onClose={handleCloseActionBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body1" fontWeight="bold">
                Please sign in for a better experience!
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginRedirect}
                >
                  Login with Email
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLoginRedirect}
                >
                  Login with Google
                </Button>
              </Box>
            </Box>
          }
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseActionBar}
            >
              <CloseIcon />
            </IconButton>
          }
        />
      )}
    </>
  );
};

export default HomePage;
