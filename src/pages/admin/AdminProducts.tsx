
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import RequireAuth from '@/components/RequireAuth';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/components/ui/use-toast';

const AdminProducts = () => {
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nameAsc');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nameAsc': 
          return a.name.localeCompare(b.name);
        case 'nameDesc': 
          return b.name.localeCompare(a.name);
        case 'priceAsc': 
          return a.price - b.price;
        case 'priceDesc': 
          return b.price - a.price;
        case 'stockAsc': 
          return a.stock - b.stock;
        case 'stockDesc': 
          return b.stock - a.stock;
        default: 
          return 0;
      }
    });
  
  const handleAddProduct = () => {
    navigate('/admin/products/add');
  };
  
  const handleEditProduct = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };
  
  const confirmDelete = (productId: string) => {
    setDeleteConfirmId(productId);
  };
  
  const handleDeleteProduct = () => {
    if (deleteConfirmId) {
      deleteProduct(deleteConfirmId);
      setDeleteConfirmId(null);
      
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully.",
      });
    }
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
    <RequireAuth allowedRoles={['admin']}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <PackageOpen className="h-8 w-8" />
              Manage Products
            </h1>
            
            <Button 
              className="mt-4 md:mt-0 bg-aqua-600 hover:bg-aqua-700"
              onClick={handleAddProduct}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Product Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                    <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                    <SelectItem value="priceAsc">Price (Low to High)</SelectItem>
                    <SelectItem value="priceDesc">Price (High to Low)</SelectItem>
                    <SelectItem value="stockAsc">Stock (Low to High)</SelectItem>
                    <SelectItem value="stockDesc">Stock (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="col-span-1 md:col-span-3">
                  <CategoryFilter 
                    activeCategory={categoryFilter} 
                    onCategoryChange={setCategoryFilter} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-16 w-16 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryBadgeColor(product.category)}>
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={`${
                            product.stock < 5 
                              ? 'text-red-600 font-medium' 
                              : product.stock < 20 
                                ? 'text-yellow-600' 
                                : 'text-green-600'
                          }`}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleEditProduct(product.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => confirmDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-gray-500">No products found matching your filters.</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Confirm Deletion
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this product? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteProduct}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
        
        <Footer />
      </div>
    </RequireAuth>
  );
};

export default AdminProducts;
