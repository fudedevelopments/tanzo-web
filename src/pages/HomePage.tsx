import React, { useRef } from "react";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import "@fontsource/dm-sans";
import Hero from "../components/Hero";
import Spline from "@splinetool/react-spline";
import axios from "axios";
import ProductListing from "../components/ProductsListing";
import TanzoBenefits from "../components/tanzobenefit";
import CategoryList from "../components/CategoriesList";

const HomePage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth.isAuth);

  const productListRef = useRef<HTMLDivElement>(null); // Create a ref for the product list section

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
        const response = await axios.get("https://4rwj6mpb22nggzgcwpykc42pbm0kvblg.lambda-url.ap-south-1.on.aws/");
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
  });

  return (
    <>
      {isProductsLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress />
        </Box>
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
            <Spline
              scene="https://prod.spline.design/PI0JLDkBeve1P6eP/scene.splinecode"
              className="spline"
            />
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
            <div ref={productListRef}> {/* Add the ref here */}
              {homepagequery?.data?.homePageProducts ? (
                <ProductListing homepageproducts={homepagequery.data.homePageProducts} />
              ) : (
                <Typography variant="body1">No products found.</Typography>
              )}
            </div>
          </Box>
        </>
      )}
    </>
  );
};

export default HomePage;
