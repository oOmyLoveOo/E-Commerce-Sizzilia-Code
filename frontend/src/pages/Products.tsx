import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Products = () => {
  return (
      <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">

        <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    Productos
                </h1>

                <div>
                    <button className="">
                        <span>Categoria</span>
                    </button>
                </div>

            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6 gap-y-8 xs:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
  );
};

export default Products;
