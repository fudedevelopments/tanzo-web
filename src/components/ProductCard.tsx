
interface ProductCardProps {
  design: string;
  title: string;
  price: string;
  salePrice: string;
  imageUrl: string;
}

const ProductCard = ({ design, title, price, salePrice, imageUrl } : ProductCardProps) => {
  return (
    <div className="max-w-xs mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-60 object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-sm px-2 py-1 font-bold rounded">
          Sale
        </span>
        <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded">
          {design}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-center">{title}</h3>
      <div className="flex justify-center items-center gap-2 mt-2">
        <span className="line-through text-gray-500">₹{price}</span>
        <span className="text-red-500 font-bold">₹{salePrice}</span>
      </div>
      <button className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition">
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
