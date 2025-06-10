type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
}

const ProductCard = ({ product }: {product: Product}) => {
    return(
        <div className="flex flex-col items-center gap-2">
            <img src={product.image} alt={product.name} className=""/>
            <h3 className="">{product.name}</h3>
            <p className="">{product.price}€</p>
            <button className="bg-black cursor-pointer text-white w-32 h-8">
                Añadir al carrito
            </button>
        </div>
    )
}

export default ProductCard;