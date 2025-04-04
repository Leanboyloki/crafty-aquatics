import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/lib/types';

const Shop = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categoryParam = searchParams.get('category') || 'all';
  
  const sortOptions = [
    { value: 'nameAsc', label: 'Name (A-Z)' },
    { value: 'nameDesc', label: 'Name (Z-A)' },
    { value: 'priceAsc', label: 'Price (Low to High)' },
    { value: 'priceDesc', label: 'Price (High to Low)' },
  ];
  
  const [sortBy, setSortBy] = useState('nameAsc');
  
  useEffect(() => {
    let result = [...products];
    
    if (categoryParam !== 'all') {
      result = result.filter(product => product.category === categoryParam);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    switch (sortBy) {
      case 'nameAsc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, categoryParam, searchQuery, sortBy]);
  
  const handleCategoryChange = (category: string) => {
    setSearchParams({ category });
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <SearchBar onSearch={handleSearch} />
            
            <div className="flex items-center gap-4">
              <div className="flex-1 md:flex-none">
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="hidden md:flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-aqua-600 hover:bg-aqua-700' : ''}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-aqua-600 hover:bg-aqua-700' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <CategoryFilter 
            activeCategory={categoryParam} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
        
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="sm:w-1/4 md:w-1/6">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-40 sm:h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-xl font-bold text-aqua-600">₹{product.price.toFixed(2)}</p>
                    </div>
                    <p className="text-gray-500 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="outline" 
                        className="border-aqua-600 text-aqua-600 hover:bg-aqua-600 hover:text-white"
                        onClick={() => window.location.href = `/product/${product.id}`}
                      >
                        View Details
                      </Button>
                      <Button 
                        className="bg-aqua-600 hover:bg-aqua-700 text-white"
                        onClick={() => {/* Add to cart functionality */}}
                        disabled={product.stock <= 0}
                      >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500">Try a different search term or category.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
