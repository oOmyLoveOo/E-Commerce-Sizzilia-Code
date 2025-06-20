import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../hooks/useCart';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  hoverImage?: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('No product ID provided');
        }
        
        const productData = await getProductById(id);
        setProduct(productData);
        setError(null);
      } catch (error: unknown) {
        console.error('Error fetching product:', error);
        setError(error instanceof Error ? error.message : 'Error al cargar el producto');
        toast.error('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      }, quantity);
      
      toast.success(`${quantity} ${product.name} añadido${quantity > 1 ? 's' : ''} al carrito`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center py-12">
        <p>Producto no encontrado</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
            }}
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-700">Categoría:</span>
            <span className="ml-2 text-gray-600">{product.category}</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
            <p className="text-gray-600">
              {product.description || 'No hay descripción disponible para este producto.'}
            </p>
          </div>
          
          <div className="flex items-center mb-8">
            <span className="mr-4 text-gray-700">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-1 text-center w-12">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;