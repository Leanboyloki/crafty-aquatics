
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/lib/types';

// Mock product data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Neon Tetra',
    description: 'A small, vibrant freshwater fish with a bright blue-green horizontal stripe along the length of its body.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1520302519863-dcc29a5beafc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'fish',
    stock: 50
  },
  {
    id: '2',
    name: 'Amazon Sword Plant',
    description: 'A popular aquarium plant known for its sword-shaped leaves and easy maintenance.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1559717201-2879521bb49c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'plants',
    stock: 30
  },
  {
    id: '3',
    name: 'Aquarium Filter',
    description: 'High-quality water filter that ensures clean and healthy water for your aquatic pets.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1584553391841-49b1f90dd5b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'equipment',
    stock: 15
  },
  {
    id: '4',
    name: 'Decorative Castle',
    description: 'A beautiful castle decoration that provides hiding spots for fish and enhances the aesthetic appeal of your aquarium.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1579160892259-20108d8a3c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'decoration',
    stock: 10
  },
  {
    id: '5',
    name: 'Betta Fish',
    description: 'A vibrant and territorial fish known for its beautiful, flowing fins.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1551395648-9f2c98df44d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'fish',
    stock: 20
  },
  {
    id: '6',
    name: 'LED Aquarium Light',
    description: 'Energy-efficient LED light with multiple color settings to illuminate your aquarium.',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1584553392642-8a932215456a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'equipment',
    stock: 12
  },
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9)
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category);
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      getProductById,
      getProductsByCategory
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
