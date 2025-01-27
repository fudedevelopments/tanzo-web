import { useNavigate } from "react-router-dom";

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
      className="max-w-xs mx-auto p-4 border rounded-2xl shadow-md bg-white cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={imagepath}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <span className="absolute top-3 left-3 bg-yellow-500 text-xs text-white px-2 py-1 font-semibold rounded-lg shadow-sm">
          Sale
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
        <div className="flex justify-center items-center gap-2 mt-2">
          <span className="line-through text-gray-500 text-sm">₹{price}</span>
          <span className="text-red-600 font-bold text-lg">₹{salePrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
