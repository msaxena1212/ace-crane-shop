import { motion } from 'framer-motion';
import { Category } from '@/data/products';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="category-card cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-sm font-medium text-foreground truncate">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {category.productCount} products
          </p>
        </div>
        <ChevronRight 
          size={18} 
          className="text-muted-foreground group-hover:text-primary transition-colors" 
        />
      </div>
    </motion.div>
  );
}
