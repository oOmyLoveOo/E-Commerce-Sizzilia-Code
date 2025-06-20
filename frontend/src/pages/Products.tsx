import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [categories, setCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);

        let filtered = fetchedProducts;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter((product: Product) =>
            product.name.toLowerCase().includes(term)
          );
        }

        setFilteredProducts(filtered);

        const uniqueCategories = [
          "Todos",
          ...new Set<string>(
            fetchedProducts.map((product: Product) => product.category)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedCategory === "Todos") {
      setFilteredProducts(
        searchTerm
          ? products.filter((p: Product) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : products
      );
    } else {
      const filtered = products.filter(
        (product: Product) => product.category === selectedCategory
      );
      setFilteredProducts(
        searchTerm
          ? filtered.filter((p: Product) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : filtered
      );
    }
  }, [selectedCategory, products, searchTerm]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {searchTerm ? `Resultados para "${searchTerm}"` : "Productos"}
          </h1>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Filtrar por categoría"
            >
              <span>{selectedCategory}</span>
              <svg
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "producto encontrado"
            : "productos encontrados"}
          {selectedCategory !== "Todos" && (
            <span className="ml-2 text-blue-600 font-medium">
              en "{selectedCategory}"
            </span>
          )}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-2">
            No hay productos disponibles
          </p>
          {selectedCategory !== "Todos" && (
            <p className="text-gray-400 text-sm">
              en la categoría "{selectedCategory}"
            </p>
          )}
          {searchTerm && (
            <p className="text-gray-400 text-sm">
              con el término "{searchTerm}"
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6 gap-y-8 xs:gap-y-12">
          {filteredProducts.map((product) => (
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
                  hoverImage: product.hoverImage,
                }}
              />
            </Link>
          ))}
        </div>
      )}

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Products;