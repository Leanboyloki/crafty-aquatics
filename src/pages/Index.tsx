
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fish, Wrench, Leaf, Palmtree } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';

const Index = () => {
  const navigate = useNavigate();
  const { products } = useProducts();
  
  // Get 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-aqua-900 to-aqua-700 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Crafty Aquatics</h1>
              <p className="text-xl mb-8">Your premier destination for all aquarium needs. Quality products, expert advice, and reliable service.</p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-coral-500 hover:bg-coral-600 text-white"
                  onClick={() => navigate('/shop')}
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-aqua-800"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21" 
                alt="Aquarium" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover-scale shadow-md overflow-hidden">
                <div className="relative h-40 bg-blue-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Fish className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Fish</h3>
                  <p className="text-gray-600 mb-4">Discover a wide variety of freshwater and saltwater fish for your aquarium.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => navigate('/shop?category=fish')}
                  >
                    Browse Fish
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-scale shadow-md overflow-hidden">
                <div className="relative h-40 bg-green-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Plants</h3>
                  <p className="text-gray-600 mb-4">Beautiful aquatic plants to create a natural and healthy environment.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={() => navigate('/shop?category=plants')}
                  >
                    Browse Plants
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-scale shadow-md overflow-hidden">
                <div className="relative h-40 bg-gray-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wrench className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Equipment</h3>
                  <p className="text-gray-600 mb-4">High-quality filters, heaters, lights, and more for your aquarium setup.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                    onClick={() => navigate('/shop?category=equipment')}
                  >
                    Browse Equipment
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover-scale shadow-md overflow-hidden">
                <div className="relative h-40 bg-purple-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Palmtree className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Decorations</h3>
                  <p className="text-gray-600 mb-4">Enhance your aquarium with decorative elements for a stunning display.</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                    onClick={() => navigate('/shop?category=decoration')}
                  >
                    Browse Decorations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Button 
                variant="link" 
                className="text-aqua-600 hover:text-aqua-800"
                onClick={() => navigate('/shop')}
              >
                View All Products
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gradient-to-r from-aqua-900 to-aqua-700 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4">Setup New Aquarium</h3>
                <p className="mb-6">Our experts will help you design and set up the perfect aquarium for your space, considering your preferences and budget.</p>
                <Button 
                  className="bg-white text-aqua-800 hover:bg-gray-100"
                  onClick={() => navigate('/services/setup')}
                >
                  Get Started
                </Button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold mb-4">Fish Tank Maintenance</h3>
                <p className="mb-6">Regular maintenance services to ensure your aquarium stays healthy and beautiful, with flexible scheduling options.</p>
                <Button 
                  className="bg-white text-aqua-800 hover:bg-gray-100"
                  onClick={() => navigate('/services/maintenance')}
                >
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"I've been shopping at Crafty Aquatics for over a year now, and I'm always impressed by the quality of their products and excellent customer service."</p>
                <p className="font-bold">- Sarah Johnson</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"Their maintenance service is outstanding. My aquarium has never looked better, and the fish are thriving. I highly recommend their services."</p>
                <p className="font-bold">- Mike Thompson</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"As a beginner, I was nervous about setting up my first aquarium. The team at Crafty Aquatics guided me through every step, and now I have a beautiful tank!"</p>
                <p className="font-bold">- Emily Carter</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-aqua-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Subscribe to our newsletter for the latest products, promotions, and aquarium care tips.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aqua-500"
                required
              />
              <Button className="bg-aqua-600 hover:bg-aqua-700 text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
