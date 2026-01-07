import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

type TabType = 'home' | 'explore' | 'cart' | 'wishlist' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as TabType, icon: Home, label: 'Home' },
    { id: 'explore' as TabType, icon: Search, label: 'Explore' },
    { id: 'cart' as TabType, icon: ShoppingCart, label: 'Cart' },
    { id: 'wishlist' as TabType, icon: Heart, label: 'Wishlist' },
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