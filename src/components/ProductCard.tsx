
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Info, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const getCategoryColor = (category: string) => {
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
    <Card className="overflow-hidden hover-scale shadow-lg h-full flex flex-col glass-card">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        />
        <Badge className={`absolute top-2 right-2 ${getCategoryColor(category)}`}>
          {product.category}
        </Badge>
        
        {/* Admin Edit Button */}
        {isAdmin && (
          <Button 
            variant="coral" 
            size="sm" 
            className="absolute top-2 left-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/products/edit/${product.id}`);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <CardContent className="py-4 flex-grow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-xl font-bold text-aqua-400 my-2">₹{product.price.toFixed(2)}</p>
        <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-aqua-600 text-aqua-400"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <Info className="h-4 w-4 mr-2" />
          Details
        </Button>
        
        <Button 
          variant="aqua" 
          size="sm" 
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
