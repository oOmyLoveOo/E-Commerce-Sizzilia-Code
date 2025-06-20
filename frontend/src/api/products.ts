const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:5000';

// Define el tipo Product primero
type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  description: string;
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error al obtener productos');
  }
};

export const addProduct = async (product: Omit<Product, '_id'>): Promise<Product> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Error al añadir producto');
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error al eliminar producto');
  }
};

export const updateProduct = async (
  id: string,
  updatedFields: Omit<Product, '_id'>
): Promise<Product> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error al actualizar producto');
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Producto no encontrado');
      }
      throw new Error(`Error: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};