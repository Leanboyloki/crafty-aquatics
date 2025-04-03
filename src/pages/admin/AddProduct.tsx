
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductForm from '@/components/ProductForm';
import RequireAuth from '@/components/RequireAuth';
import { useProducts } from '@/context/ProductContext';
import { useToast } from '@/components/ui/use-toast';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addProduct(data);
      
      toast({
        title: "Product added",
        description: "The product has been added successfully.",
      });
      
      navigate('/admin/products');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the product. Please try again.",
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
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Fill in the details below to create a new product in your inventory.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <ProductForm 
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

export default AddProduct;
