import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  HelpCircle, 
  Settings, 
  LogOut,
  ChevronRight,
  Phone,
  Bell
} from 'lucide-react';

export default function ProfileScreen() {
  const menuItems = [
    { icon: Package, label: 'My Orders', subtitle: 'Track your orders' },
    { icon: MapPin, label: 'Saved Addresses', subtitle: 'Manage delivery addresses' },
    { icon: CreditCard, label: 'Payment Methods', subtitle: 'Cards & UPI' },
    { icon: Bell, label: 'Notifications', subtitle: 'Manage alerts' },
    { icon: HelpCircle, label: 'Help & Support', subtitle: '24/7 customer support' },
    { icon: Settings, label: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-background pt-6 pb-8 px-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <User size={36} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Welcome!
            </h1>
            <p className="text-muted-foreground text-sm">Sign in for best experience</p>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl btn-glow"
        >
          Sign In / Register
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-xl p-4 shadow-card grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted-foreground">Wishlist</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">0</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-secondary transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </motion.button>
          );
        })}
      </div>

      {/* Contact Support */}
      <div className="px-4 mb-6">
        <div className="bg-card rounded-xl p-4 border border-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Phone size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Need Help?</p>
              <p className="text-sm text-primary font-semibold">1800-ACE-HELP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4">
        <button className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-destructive transition-colors">
          <LogOut size={18} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>

      {/* App Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        ACE Parts App v1.0.0
      </p>
    </div>
  );
}
