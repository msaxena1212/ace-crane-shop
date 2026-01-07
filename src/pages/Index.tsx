import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import BottomNav from '@/components/BottomNav';
import HomeScreen from '@/screens/HomeScreen';
import ExploreScreen from '@/screens/ExploreScreen';
import CartScreen from '@/screens/CartScreen';
import WishlistScreen from '@/screens/WishlistScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import { Product } from '@/data/products';

type TabType = 'home' | 'explore' | 'cart' | 'wishlist' | 'profile';

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [exploreCategoryId, setExploreCategoryId] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigateToExplore = (categoryId?: string) => {
    setExploreCategoryId(categoryId);
    setActiveTab('explore');
  };

  const handleTabChange = (tab: TabType) => {
    if (tab !== 'explore') {
      setExploreCategoryId(undefined);
    }
    setActiveTab(tab);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Show product detail screen if a product is selected
  if (selectedProduct) {
    return (
      <ProductDetailScreen 
        product={selectedProduct} 
        onBack={handleBackFromProduct}
        onProductPress={handleProductPress}
      />
    );
  }

  return (
    <div className="mobile-container min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'home' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {activeTab === 'home' && (
            <HomeScreen 
              onNavigateToExplore={handleNavigateToExplore} 
              onProductPress={handleProductPress}
            />
          )}
          {activeTab === 'explore' && (
            <ExploreScreen 
              initialCategoryId={exploreCategoryId} 
              onProductPress={handleProductPress}
            />
          )}
          {activeTab === 'cart' && <CartScreen />}
          {activeTab === 'wishlist' && <WishlistScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </motion.div>
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}