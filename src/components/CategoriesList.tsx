import { Flex } from "@aws-amplify/ui-react";
import { Schema } from "../../amplify/data/resource";
import CategoryBox from "./categoryBox";
import { useNavigate } from "react-router-dom";

type categories = {
  category: Schema["Categories"]["type"][];
}

function CategoryList({ category }: categories) {
  const navigate = useNavigate();

  return (
    <Flex
      direction="row"
      gap="1rem"         // Increased gap between items
      wrap="nowrap"
      overflow="auto"
      padding="1rem"     // Increased padding
      width="100%"       // Ensure full width
      minHeight="100px"  // Set minimum height
    >
      {category.map((item) => {
        return (
          <Flex
            key={item.name}
            flex="0 0 200px"  // Fixed width for each category item (don't shrink, don't grow)
          >
            <CategoryBox
              imageUrl={item.image}
              name={item.name}
              onClick={() => navigate(`/productListPage/${item.id}`)}
            />
          </Flex>
        );
      })}
    </Flex>
  );
}

export default CategoryList;
