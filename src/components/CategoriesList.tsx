import { Flex } from "@aws-amplify/ui-react";
import CategoryBox from "./categoryBox";
import { useNavigate } from "react-router-dom";

type Category = {
  id: string;
  name: string;
  image?: string; // Optional field to handle missing images
};

type CategoryListProps = {
  category: Category[];
};

function CategoryList({ category }: CategoryListProps) {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      gap="1rem"
      padding="1rem"
      width="100%"
      alignItems="center" // Center the heading and list
    >
      {/* Top heading */}
      <div className="text-3xl">
       All Categories
      </div>

    <Flex
      direction="row"
      gap="1rem"
      wrap="wrap" // Wrap items for smaller screens
      overflow="auto"
      padding="1rem"
      width="100%"
      minHeight="100px"
      justifyContent="start" // Center content on smaller screens
    >
      {category.map((item) => {
        return (
          <Flex
            key={item.id} // Use the unique ID as the key
            flex="1 1 calc(33.333% - 1rem)" // Adaptive width for up to 3 items per row
            maxWidth="200px" // Limit max width of each category box
            minWidth="150px" // Minimum width for small screens
          >
            <CategoryBox
              imageUrl={item.image || "/placeholder-image.png"} // Fallback for missing image
              name={item.name}
              onClick={() => navigate(`/productListPage/${item.id}`)}
            />
          </Flex>
        );
      })}
      </Flex>
      
     </Flex>
  );
}

export default CategoryList;
