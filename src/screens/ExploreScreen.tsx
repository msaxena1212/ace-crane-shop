import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Star, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS, Category } from '@/data/products';

interface ExploreScreenProps {
  initialCategoryId?: string;
}

export default function ExploreScreen({ initialCategoryId }: ExploreScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES.find(c => c.id === initialCategoryId) || CATEGORIES[0]
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let result = PRODUCTS.filter(p => p.category === selectedCategory.name);

    if (selectedSubCategory !== 'All') {
      result = result.filter(p => p.subCategory === selectedSubCategory);
    }

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    setFilteredProducts(result);
  }, [selectedCategory, selectedSubCategory, minRating]);

  useEffect(() => {
    if (initialCategoryId) {
      const category = CATEGORIES.find(c => c.id === initialCategoryId);
      if (category) {
        setSelectedCategory(category);
        setSelectedSubCategory('All');
      }
    }
  }, [initialCategoryId]);

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-display text-xl font-bold text-foreground">
            Explore Products
          </h1>
          <button 
            onClick={() => setFilterVisible(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm font-medium"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Category Sidebar */}
        <div className="w-20 flex-shrink-0 border-r border-border overflow-y-auto hide-scrollbar bg-card/50">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory('All');
              }}
              className={`w-full py-4 px-2 flex flex-col items-center gap-2 transition-all border-l-2 ${
                selectedCategory.id === category.id
                  ? 'bg-primary/10 border-primary'
                  : 'border-transparent hover:bg-secondary'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className={`text-[10px] text-center leading-tight ${
                selectedCategory.id === category.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {/* Sub Categories */}
          <div className="sticky top-0 z-30 bg-background border-b border-border">
            <div className="flex gap-2 px-3 py-3 overflow-x-auto hide-scrollbar">
              {selectedCategory.subCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSubCategory === sub
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <span className="text-4xl">🔧</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  No Products Found
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters or browse other categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {isFilterVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterVisible(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[70vh] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-xl font-semibold">Filters</h3>
                  <button
                    onClick={() => setFilterVisible(false)}
                    className="icon-btn"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Minimum Rating</h4>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm ${
                          minRating === rating
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {rating === 0 ? (
                          'All'
                        ) : (
                          <>
                            <Star size={14} className="fill-current" />
                            {rating}+
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => setFilterVisible(false)}
                  className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-xl btn-glow"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
