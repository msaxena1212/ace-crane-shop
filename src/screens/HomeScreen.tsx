import { Search, Bell, Truck, Shield, Headphones, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { CATEGORIES, FEATURED_PRODUCTS, PRODUCTS, Product } from '@/data/products';

interface HomeScreenProps {
  onNavigateToExplore: (categoryId?: string) => void;
  onProductPress?: (product: Product) => void;
}

export default function HomeScreen({ onNavigateToExplore, onProductPress }: HomeScreenProps) {
  const features = [
    { icon: Truck, title: 'Fast Delivery', subtitle: 'Swift & Reliable' },
    { icon: Shield, title: 'Secure Payment', subtitle: '100% Protected' },
    { icon: Headphones, title: 'Support 24/7', subtitle: 'Dedicated Help' },
    { icon: CreditCard, title: 'Easy Payment', subtitle: 'Multiple Options' },
  ];

  return (
    <div className="pb-24 hide-scrollbar overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-display text-2xl font-bold">
              <span className="text-primary">ACE</span>
              <span className="text-foreground"> Parts</span>
            </h1>
            <p className="text-xs text-muted-foreground">Genuine Spare Parts</p>
          </div>
          <button className="icon-btn relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Enter part number or name..."
            className="search-input"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Can't find your part? Call 1800-ACE-HELP
        </p>
      </div>

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 rounded-2xl overflow-hidden bg-gradient-to-r from-card to-secondary"
      >
        <div className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="font-display text-2xl font-bold text-foreground relative z-10">
            GENUINE <span className="text-primary">ACE</span> PARTS
          </h2>
          <p className="text-sm text-muted-foreground mt-2 relative z-10">
            Ensuring your machines run at peak performance
          </p>
          <button className="mt-4 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg text-sm btn-glow relative z-10">
            Shop Now
          </button>
        </div>
      </motion.div>

      {/* Features */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-4 gap-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                  <Icon size={18} className="text-primary" />
                </div>
                <p className="text-[10px] font-medium text-foreground leading-tight">
                  {feature.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Popular Categories
          </h2>
          <button 
            onClick={() => onNavigateToExplore()}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {CATEGORIES.slice(0, 4).map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard 
                category={category} 
                onPress={() => onNavigateToExplore(category.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Discount Offers */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Top Discount Offers
          </h2>
          <button 
            onClick={() => onNavigateToExplore()}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FEATURED_PRODUCTS.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onPress={() => onProductPress?.(product)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bulk Order Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 my-6 rounded-2xl overflow-hidden border border-primary/30"
        style={{ background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.1) 100%)' }}
      >
        <div className="p-6">
          <h3 className="font-display text-xl font-bold text-foreground">
            Bulk Order = <span className="text-primary">Big Savings</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Get exclusive discounts on large volume orders for your fleet maintenance.
          </p>
          <button className="mt-4 px-6 py-2.5 border border-primary text-primary font-medium rounded-lg text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
            Contact Sales
          </button>
        </div>
      </motion.div>

      {/* New Arrivals */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            New Arrivals
          </h2>
          <button 
            onClick={() => onNavigateToExplore()}
            className="text-sm text-primary font-medium"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(4, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} onPress={() => onProductPress?.(product)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
