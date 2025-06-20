import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/products";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">
        <div className="text-center py-12">
          <p className="text-gray-600">No hay productos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6 gap-y-8 xs:gap-y-12">
        {products.map((product) => (
          <Link 
            to={`/products/${product._id}`}
            key={product._id}
            className="block hover:shadow-lg transition-shadow duration-200 rounded-lg"
          >
            <ProductCard 
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                hoverImage: product.hoverImage
              }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;