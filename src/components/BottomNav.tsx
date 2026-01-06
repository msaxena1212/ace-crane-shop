import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

type TabType = 'home' | 'explore' | 'cart' | 'wishlist' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { totalItems: cartItems } = useCart();
  const { totalItems: wishlistItems } = useWishlist();

  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'explore' as TabType, icon: Search, label: 'Explore' },
    { id: 'cart' as TabType, icon: ShoppingCart, label: 'Cart', badge: cartItems },
    { id: 'wishlist' as TabType, icon: Heart, label: 'Wishlist', badge: wishlistItems },
    { id: 'profile' as TabType, icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`bottom-nav-item relative ${isActive ? 'active' : ''}`}
            >
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Icon 
                    size={22} 
                    className={isActive ? 'fill-primary stroke-primary' : ''} 
                    fill={isActive && tab.id === 'wishlist' ? 'currentColor' : 'none'}
                  />
                </motion.div>
                
                {/* Badge */}
                {tab.badge && tab.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </motion.span>
                )}
              </div>
              
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
              
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
