
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductForm from '@/components/ProductForm';
import RequireAuth from '@/components/RequireAuth';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/components/ui/use-toast';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, updateProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <RequireAuth allowedRoles={['admin']}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button 
              onClick={() => navigate('/admin/products')}
              className="bg-aqua-600 hover:bg-aqua-700"
            >
              Back to Products
            </Button>
          </main>
          <Footer />
        </div>
      </RequireAuth>
    );
  }
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProduct({ ...data, id: product.id });
      
      toast({
        title: "Product updated",
        description: "The product has been updated successfully.",
      });
      
      navigate('/admin/products');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating the product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RequireAuth allowedRoles={['admin']}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/admin/products')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Edit Product</CardTitle>
              <CardDescription>
                Update the details of the product below.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <ProductForm 
                initialData={product}
                onSubmit={handleSubmit} 
                isLoading={isSubmitting}
              />
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </RequireAuth>
  );
};

export default EditProduct;
