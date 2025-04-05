
/**
 * Database service for handling MongoDB operations
 * This service interfaces with MongoDB Atlas for persistence
 */

import { Product, User, Order } from '@/lib/types';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import UserModel from '@/models/User';
import OrderModel from '@/models/Order';

// Product operations
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    await connectToDatabase();
    console.log('Fetching products from MongoDB');
    
    // Convert MongoDB documents to our Product type
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
    await connectToDatabase();
    console.log('Creating product in MongoDB:', product);
    
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
    await connectToDatabase();
    console.log('Updating product in MongoDB:', product);
    
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
    await connectToDatabase();
    console.log('Deleting product from MongoDB:', id);
    
    await ProductModel.findByIdAndDelete(id);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Order operations
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    await connectToDatabase();
    console.log('Fetching orders from MongoDB');
    
    const orders = await OrderModel.find({});
    return orders.map((order: any) => ({
      id: order._id.toString(),
      userId: order.userId,
      items: order.items.map((item: any) => ({
        product: {
          id: item.productId.toString(),
          name: item.name,
          description: '',  // These fields might need to be populated
          price: item.price,
          image: item.image,
          category: 'fish', // Default value, might need population
          stock: 0,         // Default value, might need population
          currency: '₹'     // Default value
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
    await connectToDatabase();
    console.log('Creating order in MongoDB:', orderData);
    
    // Transform cart items to order items format
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
      items: orderData.items,  // Use original items with full product details
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
    await connectToDatabase();
    console.log(`Updating order ${orderId} status to ${status}`);
    
    await OrderModel.findByIdAndUpdate(orderId, { status });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// User operations
export const fetchUsers = async (): Promise<User[]> => {
  try {
    await connectToDatabase();
    console.log('Fetching users from MongoDB');
    
    const users = await UserModel.find({}, '-password');  // Exclude password
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
    await connectToDatabase();
    console.log('Creating user in MongoDB:', userData);
    
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
