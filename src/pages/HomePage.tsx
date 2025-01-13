import ProductListing from "../components/ProductsListing";
import ScrollingBanner from "../components/ScrollingBanner";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import { client } from "../utils/client";
import BenefitSection from "../components/benefitSection";
import CategoryList from "../components/CategoriesList";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";


const HomePage: React.FC = () => {

  const auth = useSelector((state: RootState) => state.auth.isAuth);

  const {
    data: homepageproducts,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["homePageProducts"],
    queryFn: async (): Promise<any> => {
      const response = await client.models.HomePageProducts.list({
        authMode: auth ? "userPool" : "identityPool"
      });
      const homepageproducts = response.data;
      if (!homepageproducts) {
        throw new Error("No products found");
      }
      return homepageproducts;
    },
  });

  

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["homePageCategories"],
    queryFn: async (): Promise<any> => {
      const response = await client.models.Categories.list({
        authMode: auth ? "userPool" : "identityPool"
      }
      );
      const categories = response.data;
      if (!categories) {
        throw new Error("No categories found");
      }
      return categories;
    },
  });

  return (
    <>
      <div className="mt-5" />
       
      {isProductsLoading || isCategoriesLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress />
        </Box>
      ) : isProductsError || isCategoriesError ? (
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
          <ScrollingBanner />
          <CategoryList category={categories} />
          <BenefitSection />
          <ProductListing HomepageProducts={homepageproducts} />
        </>
      )}
    </>
  );
};

export default HomePage;
