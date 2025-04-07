
/**
 * Database service for handling MongoDB operations
 * This service automatically handles both browser and server environments
 */

import { Product, User, Order } from '@/lib/types';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import UserModel from '@/models/User';
import OrderModel from '@/models/Order';

// Helper function to check if we're in browser environment
const isClient = typeof window !== 'undefined';

// -------------------- Product Operations --------------------

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    // Browser environment uses localStorage
    if (isClient) {
      console.log('Using local storage for products');
      const savedProducts = localStorage.getItem('aquaProducts');
      if (savedProducts) {
        return JSON.parse(savedProducts);
      }
      return [];
    }
    
    // Server environment uses MongoDB
    await connectToDatabase();
    console.log('Fetching products from MongoDB');
    
    const products = await ProductModel.find({});
    return products.map((product: any) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      currency: product.currency
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  try {
    if (isClient) {
      // Browser environment
      const savedProducts = localStorage.getItem('aquaProducts');
      const products = savedProducts ? JSON.parse(savedProducts) : [];
      
      const newProduct = {
        ...product,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      localStorage.setItem('aquaProducts', JSON.stringify([...products, newProduct]));
      return newProduct;
    }
    
    // Server environment
    await connectToDatabase();
    const newProduct = await ProductModel.create(product);
    
    return {
      id: newProduct._id.toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      category: newProduct.category as 'fish' | 'plants' | 'equipment' | 'decoration',
      stock: newProduct.stock,
      currency: newProduct.currency
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    if (isClient) {
      // Browser environment
      const savedProducts = localStorage.getItem('aquaProducts');
      const products = savedProducts ? JSON.parse(savedProducts) : [];
      
      const updatedProducts = products.map((p: Product) => 
        p.id === product.id ? product : p
      );
      
      localStorage.setItem('aquaProducts', JSON.stringify(updatedProducts));
      return product;
    }
    
    // Server environment
    await connectToDatabase();
    const { id, ...updateData } = product;
    await ProductModel.findByIdAndUpdate(id, updateData);
    
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    if (isClient) {
      // Browser environment
      const savedProducts = localStorage.getItem('aquaProducts');
      const products = savedProducts ? JSON.parse(savedProducts) : [];
      
      const filteredProducts = products.filter((p: Product) => p.id !== id);
      localStorage.setItem('aquaProducts', JSON.stringify(filteredProducts));
      return;
    }
    
    // Server environment
    await connectToDatabase();
    await ProductModel.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// -------------------- Order Operations --------------------

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    if (isClient) {
      // Browser environment
      const savedOrders = localStorage.getItem('aquaOrders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    }
    
    // Server environment
    await connectToDatabase();
    const orders = await OrderModel.find({});
    
    return orders.map((order: any) => ({
      id: order._id.toString(),
      userId: order.userId,
      items: order.items.map((item: any) => ({
        product: {
          id: item.productId.toString(),
          name: item.name,
          description: '',
          price: item.price,
          image: item.image,
          category: 'fish', // Default category
          stock: 0,
          currency: '₹'
        },
        quantity: item.quantity
      })),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      address: order.address,
      paymentMethod: order.paymentMethod
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  try {
    if (isClient) {
      // Browser environment
      const savedOrders = localStorage.getItem('aquaOrders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      
      const newOrder = {
        ...orderData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('aquaOrders', JSON.stringify([...orders, newOrder]));
      return newOrder;
    }
    
    // Server environment
    await connectToDatabase();
    
    const items = orderData.items.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }));
    
    const newOrder = await OrderModel.create({
      ...orderData,
      items
    });
    
    return {
      id: newOrder._id.toString(),
      userId: newOrder.userId,
      items: orderData.items,
      total: newOrder.total,
      status: newOrder.status,
      createdAt: newOrder.createdAt.toISOString(),
      address: newOrder.address,
      paymentMethod: newOrder.paymentMethod
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<void> => {
  try {
    if (isClient) {
      // Browser environment
      const savedOrders = localStorage.getItem('aquaOrders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      
      const updatedOrders = orders.map((order: Order) => 
        order.id === orderId ? { ...order, status } : order
      );
      
      localStorage.setItem('aquaOrders', JSON.stringify(updatedOrders));
      return;
    }
    
    // Server environment
    await connectToDatabase();
    await OrderModel.findByIdAndUpdate(orderId, { status });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// -------------------- User Operations --------------------

export const fetchUsers = async (): Promise<User[]> => {
  try {
    if (isClient) {
      // Browser environment
      const savedUsers = localStorage.getItem('aquaUsers');
      return savedUsers ? JSON.parse(savedUsers) : [];
    }
    
    // Server environment
    await connectToDatabase();
    const users = await UserModel.find({}, '-password');
    
    return users.map((user: any) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  try {
    if (isClient) {
      // Browser environment
      const savedUsers = localStorage.getItem('aquaUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      
      const newUser = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      localStorage.setItem('aquaUsers', JSON.stringify([...users, newUser]));
      return newUser;
    }
    
    // Server environment
    await connectToDatabase();
    const newUser = await UserModel.create(userData);
    
    return {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    if (isClient) {
      // Browser environment
      const savedUsers = localStorage.getItem('aquaUsers');
      const users = savedUsers ? JSON.parse(savedUsers) : [];
      const user = users.find((user: User) => user.email === email);
      return user || null;
    }
    
    // Server environment
    await connectToDatabase();
    const user = await UserModel.findOne({ email });
    
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
};

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    if (isClient) {
      // Browser environment - check demo users
      // In a real app, we'd use a proper auth service
      if ((email === 'admin@aquastore.com' && password === 'admin123') ||
          (email === 'user@aquastore.com' && password === 'user123')) {
        
        const role = email.startsWith('admin') ? 'admin' : 'user';
        const name = role === 'admin' ? 'Admin User' : 'Test User';
        
        return {
          id: email.replace('@', '-').replace('.', '-'),
          email,
          name,
          role
        };
      }
      
      return null;
    }
    
    // Server environment
    await connectToDatabase();
    // In a real app, we'd hash and compare passwords
    const user = await UserModel.findOne({ email, password });
    
    if (!user) return null;
    
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
