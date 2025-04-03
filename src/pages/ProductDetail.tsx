
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MinusCircle, PlusCircle, ShoppingCart, TruckIcon, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, getProductById } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-aqua-600 hover:bg-aqua-700"
          >
            Back to Shop
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Get similar products (same category, excluding current product)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'fish':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'plants':
        return 'bg-green-500 hover:bg-green-600';
      case 'equipment':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'decoration':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-aqua-500 hover:bg-aqua-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryBadgeColor(product.category)}>
                {product.category}
              </Badge>
              
              <span className={`px-2 py-1 rounded text-sm ${
                product.stock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <p className="text-3xl font-bold text-aqua-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
              
              <Button 
                className="w-full bg-aqua-600 hover:bg-aqua-700 mb-4"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <TruckIcon className="h-4 w-4 text-aqua-600" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <ShieldCheck className="h-4 w-4 text-aqua-600" />
                  <span>30-day money back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <Tabs defaultValue="description">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="care">Care Guidelines</TabsTrigger>
              <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-700 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, velit vel bibendum bibendum, 
                velit metus bibendum velit, vel bibendum velit metus bibendum velit.
              </p>
            </TabsContent>
            
            <TabsContent value="care" className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Care Guidelines</h3>
              <p className="text-gray-700">
                {product.category === 'fish' && (
                  <>
                    <strong>Water Parameters:</strong> Maintain a temperature between 72-78°F with a pH of 6.8-7.5.<br />
                    <strong>Feeding:</strong> Feed small amounts 2-3 times daily.<br />
                    <strong>Tank Mates:</strong> Compatible with most peaceful community fish.
                  </>
                )}
                
                {product.category === 'plants' && (
                  <>
                    <strong>Lighting:</strong> Medium to high lighting conditions are optimal.<br />
                    <strong>Substrate:</strong> Nutrient-rich substrate recommended.<br />
                    <strong>CO2:</strong> Additional CO2 will help promote healthy growth.
                  </>
                )}
                
                {product.category === 'equipment' && (
                  <>
                    <strong>Maintenance:</strong> Clean regularly to maintain optimal performance.<br />
                    <strong>Installation:</strong> Follow the provided manual for proper setup.<br />
                    <strong>Warranty:</strong> This product comes with a 1-year manufacturer warranty.
                  </>
                )}
                
                {product.category === 'decoration' && (
                  <>
                    <strong>Placement:</strong> Avoid blocking swimming paths or equipment.<br />
                    <strong>Cleaning:</strong> Rinse thoroughly before placing in the aquarium.<br />
                    <strong>Compatibility:</strong> Safe for all freshwater and saltwater environments.
                  </>
                )}
              </p>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
              <p className="text-gray-700">
                <strong>Processing Time:</strong> Orders are processed within 1-2 business days.<br />
                <strong>Shipping Method:</strong> We use premium carriers to ensure safe delivery.<br />
                <strong>Live Arrival Guarantee:</strong> All living organisms are guaranteed to arrive alive and healthy.<br />
                <strong>Free Shipping:</strong> Orders over $50 qualify for free shipping within the continental US.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
