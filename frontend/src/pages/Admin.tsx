import { useEffect, useState } from "react";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../api/products";
import { FiPlus, FiTrash2, FiEdit3, FiPackage, FiSave, FiX } from "react-icons/fi";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  description: string;
};

type ProductFormData = {
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  description: string;
};

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<ProductFormData>({
    name: "",
    price: 0,
    category: "",
    image: "",
    hoverImage: "",
    description: ""
  });
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar productos
  const loadProducts = async () => {
    try {
      const prods = await getProducts();
      setProducts(prods);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      alert("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminPassword = prompt("Contraseña de admin");
    if (adminPassword !== import.meta.env.VITE_ADMIN_PASSWORD) {
    alert("No autorizado");
    window.location.href = "/";
    return;
    }
    
    loadProducts();
  }, []);

  // Añadir producto
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      await addProduct(newProduct);
      setNewProduct({ 
        name: "", 
        price: 0, 
        category: "", 
        image: "", 
        hoverImage: "",
        description: "" 
      });
      setIsAddingProduct(false);
      loadProducts();
      alert("Producto añadido correctamente");
    } catch (error) {
      console.error("Error al añadir producto:", error);
      alert("Error al añadir producto");
    }
  };

  // Eliminar producto
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProduct(id);
        loadProducts();
        alert("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert("Error al eliminar producto");
      }
    }
  };

  // Actualizar producto
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct._id, {
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image,
        hoverImage: editingProduct.hoverImage,
        description: editingProduct.description
      });
      setEditingProduct(null);
      loadProducts();
      alert("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      alert("Error al actualizar producto");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FiPackage className="text-blue-600" />
            Panel de Administración
          </h1>
          <p className="text-gray-600 mt-2">Gestiona los productos de tu tienda</p>
        </div>

        {/* Botón Añadir Producto */}
        {!isAddingProduct && !editingProduct && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiPlus />
              Añadir Nuevo Producto
            </button>
          </div>
        )}

        {/* Formulario Añadir Producto */}
        {isAddingProduct && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Nuevo Producto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre del producto *"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Precio *"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Categoría *"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="URL de imagen principal"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="URL de imagen hover"
                value={newProduct.hoverImage}
                onChange={(e) => setNewProduct({ ...newProduct, hoverImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="md:col-span-2">
                <textarea
                  placeholder="Descripción del producto"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddProduct}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiSave />
                Añadir Producto
              </button>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setNewProduct({ 
                    name: "", 
                    price: 0, 
                    category: "", 
                    image: "", 
                    hoverImage: "",
                    description: ""
                  });
                }}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                <FiX />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Formulario Editar Producto */}
        {editingProduct && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Editar Producto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre del producto *"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Precio *"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Categoría *"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="URL de imagen principal"
                value={editingProduct.image}
                onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="url"
                placeholder="URL de imagen hover"
                value={editingProduct.hoverImage}
                onChange={(e) => setEditingProduct({ ...editingProduct, hoverImage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="md:col-span-2">
                <textarea
                  placeholder="Descripción del producto"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Máximo 500 caracteres</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleUpdateProduct}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiSave />
                Guardar Cambios
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                <FiX />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Productos */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Productos ({products.length})
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <FiPackage className="text-gray-300 text-6xl mx-auto mb-4" />
              <p className="text-gray-500">No hay productos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden group">
                    {product.image ? (
                      <>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        />
                        {product.hoverImage && (
                          <img
                            src={product.hoverImage}
                            alt={`${product.name} hover`}
                            className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          />
                        )}
                      </>
                    ) : (
                      <FiPackage className="text-gray-400 text-4xl" />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block mb-2">
                      {product.category}
                    </p>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-md hover:bg-blue-200 transition-colors text-sm flex-1 justify-center"
                      >
                        <FiEdit3 />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-2 rounded-md hover:bg-red-200 transition-colors text-sm flex-1 justify-center"
                      >
                        <FiTrash2 />
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;