
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import UserModel from '@/models/User';

// Demo data
const productData = [
  {
    name: 'Neon Tetra',
    description: 'A small, vibrant freshwater fish with a bright blue-green horizontal stripe along the length of its body.',
    price: 225,
    image: 'https://images.unsplash.com/photo-1545048984-94b9645723f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'fish',
    stock: 50,
    currency: '₹'
  },
  {
    name: 'Amazon Sword Plant',
    description: 'A popular aquarium plant known for its sword-shaped leaves and easy maintenance.',
    price: 375,
    image: 'https://images.unsplash.com/photo-1636597059968-7ea550a8f75a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'plants',
    stock: 30,
    currency: '₹'
  },
  {
    name: 'Aquarium Filter',
    description: 'High-quality water filter that ensures clean and healthy water for your aquatic pets.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1584553321868-5fe8a8010228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'equipment',
    stock: 15,
    currency: '₹'
  },
  {
    name: 'Decorative Castle',
    description: 'A beautiful castle decoration that provides hiding spots for fish and enhances the aesthetic appeal of your aquarium.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1581123303451-9a2f7bd2bd4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'decoration',
    stock: 10,
    currency: '₹'
  }
];

const userData = [
  {
    name: 'Admin User',
    email: 'admin@aquastore.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin'
  },
  {
    name: 'Test User',
    email: 'user@aquastore.com',
    password: 'user123', // In real app, this would be hashed
    role: 'user'
  }
];

export const seedDatabase = async () => {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.log('Browser environment detected, skipping database seeding');
      return;
    }

    // Connect to database
    const mongoose = await connectToDatabase();
    
    // Seed products if none exist
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      console.log('Seeding products...');
      await ProductModel.insertMany(productData);
      console.log('Products seeded successfully!');
    } else {
      console.log(`Found ${productCount} existing products, skipping product seeding`);
    }
    
    // Seed users if none exist
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      console.log('Seeding users...');
      await UserModel.insertMany(userData);
      console.log('Users seeded successfully!');
    } else {
      console.log(`Found ${userCount} existing users, skipping user seeding`);
    }
    
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error; // Re-throw to be caught by the caller
  }
};
