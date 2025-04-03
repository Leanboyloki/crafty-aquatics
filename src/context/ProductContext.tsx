
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/lib/types';

// Mock product data
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Neon Tetra',
    description: 'A small, vibrant freshwater fish with a bright blue-green horizontal stripe along the length of its body.',
    price: 225,
    image: 'https://images.unsplash.com/photo-1545048984-94b9645723f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'fish',
    stock: 50,
    currency: '₹'
  },
  {
    id: '2',
    name: 'Amazon Sword Plant',
    description: 'A popular aquarium plant known for its sword-shaped leaves and easy maintenance.',
    price: 375,
    image: 'https://images.unsplash.com/photo-1636597059968-7ea550a8f75a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'plants',
    stock: 30,
    currency: '₹'
  },
  {
    id: '3',
    name: 'Aquarium Filter',
    description: 'High-quality water filter that ensures clean and healthy water for your aquatic pets.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1584553321868-5fe8a8010228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'equipment',
    stock: 15,
    currency: '₹'
  },
  {
    id: '4',
    name: 'Decorative Castle',
    description: 'A beautiful castle decoration that provides hiding spots for fish and enhances the aesthetic appeal of your aquarium.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1581123303451-9a2f7bd2bd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'decoration',
    stock: 10,
    currency: '₹'
  },
  {
    id: '5',
    name: 'Betta Fish',
    description: 'A vibrant and territorial fish known for its beautiful, flowing fins.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1583950421983-8f4eaa13bd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'fish',
    stock: 20,
    currency: '₹'
  },
  {
    id: '6',
    name: 'LED Aquarium Light',
    description: 'Energy-efficient LED light with multiple color settings to illuminate your aquarium.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1598084991519-c90900bc9df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'equipment',
    stock: 12,
    currency: '₹'
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
      id: Math.random().toString(36).substr(2, 9),
      currency: '₹' // Set default currency for new products
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
