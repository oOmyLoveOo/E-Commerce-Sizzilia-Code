// services/productService.ts
export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  products: Product[];
  total: number;
}

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const productService = {
  // Buscar productos por nombre
  searchProducts: async (query: string, limit: number = 5): Promise<Product[]> => {
    try {
      if (!query.trim()) return [];
      
      const response = await fetch(
        `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }
      
      const data: SearchResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Obtener todos los productos (para filtrado local si prefieres)
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      
      const data: SearchResponse = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Filtrar productos localmente (alternativa sin API)
  filterProductsByName: (products: Product[], query: string, limit: number = 5): Product[] => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return products
      .filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, limit);
  }
};