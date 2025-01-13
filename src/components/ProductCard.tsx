
import { useNavigate } from "react-router-dom";
import DisplayImage from "../utils/imageview";

interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  salePrice: string;
  imagepath: string[] | any;
}

const ProductCard = ({ id, title, price, salePrice, imagepath }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/productview/${id}`);
  };

  return (
    <div
      className="max-w-xs mx-auto p-4 border rounded-lg shadow-lg bg-white cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <DisplayImage path={imagepath[0]} width={180} height={200} />
        <span className="absolute top-2 left-2 bg-yellow-400 text-sm px-2 py-1 font-bold rounded">
          Sale
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-center">{title}</h3>
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="line-through text-gray-500">₹{price}</span>
        <span className="text-red-500 font-bold">₹{salePrice}</span>
      </div>
    </div>
  );
};

export default ProductCard;

