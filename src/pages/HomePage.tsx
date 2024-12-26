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

const HomePage: React.FC = () => {

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ["homePageProducts"],
    queryFn: async (): Promise<any> => {
      const response = await client.models.Products.list({
      });
      const products = response.data;
      if (!products) {
        throw new Error("No products found");
      }
      return products;
    },
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["homePageCategories"],
    queryFn: async (): Promise<any> => {
      const response = await client.models.Categories.list();
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
          <ProductListing Products={products} />
        </>
      )}
    </>
  );
};

export default HomePage;
