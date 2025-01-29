import { Flex, Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryBox from "./categoryBox";

type Category = {
  id: string;
  name: string;
  image?: string;
};

type CategoryListProps = {
  category: Category[];
};

function CategoryList({ category }: CategoryListProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex direction="column" gap="1rem" padding="1rem" width="100%" alignItems="center">
      <div className="text-3xl">All Categories</div>
      <Flex alignItems="center" width="100%" position="relative">
        <Button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </Button>
        <Flex
          ref={scrollRef}
          direction="row"
          gap="1rem"
          className="hide-scrollbar"
          padding="1rem"
          width="100%"
          style={{ scrollBehavior: "smooth", whiteSpace: "nowrap", overflow: "hidden", }}
        >
          {category.map((item) => (
            <Flex
              key={item.id}
              width="200px"
              minWidth="150px"
              style={{ flexShrink: 0 }}
            >
              <CategoryBox
                imageUrl={item.image || "/placeholder-image.png"}
                name={item.name}
                onClick={() => navigate(`/productListPage/${item.id}`)}
              />
            </Flex>
          ))}
        </Flex>
        <Button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white shadow-md rounded-full p-2"
        >
          <ChevronRight size={24} />
        </Button>
      </Flex>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </Flex>
  );
}

export default CategoryList;
