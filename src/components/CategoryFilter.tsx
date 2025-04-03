
import React from 'react';
import { Button } from '@/components/ui/button';
import { Fish, Leaf, Wrench, Palmtree } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const categories = [
    { id: 'all', name: 'All', icon: null },
    { id: 'fish', name: 'Fish', icon: Fish },
    { id: 'plants', name: 'Plants', icon: Leaf },
    { id: 'equipment', name: 'Equipment', icon: Wrench },
    { id: 'decoration', name: 'Decoration', icon: Palmtree }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          className={activeCategory === category.id 
            ? "bg-aqua-600 hover:bg-aqua-700 text-white" 
            : "border-aqua-600 text-aqua-600 hover:bg-aqua-600 hover:text-white"
          }
          onClick={() => onCategoryChange(category.id)}
        >
          {category.icon && <category.icon className="h-4 w-4 mr-2" />}
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
