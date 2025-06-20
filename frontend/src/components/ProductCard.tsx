import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
}

const ProductCard: React.FC<{ product: ProductCardProps }> = ({ product }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-lg font-semibold text-blue-600 mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;