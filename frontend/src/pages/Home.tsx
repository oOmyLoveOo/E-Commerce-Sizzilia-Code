import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Home = () => {
    return(
        <div className="max-w-7xl mx-auto px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 mt-8 mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-6 gap-y-8 xs:gap-y-12">
                {products.map((product) =>(
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}

export default Home;