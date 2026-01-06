import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground text-center">
          Your Cart is Empty
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          Start shopping to add items to your cart
        </p>
      </div>
    );
  }

  return (
    <div className="pb-40">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-display text-xl font-bold text-foreground">
            Shopping Cart ({items.length})
          </h1>
          <button 
            onClick={clearCart}
            className="text-sm text-destructive font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-primary font-medium">
                    {item.product.partNumber}
                  </p>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2">
                    {item.product.name}
                  </h3>
                  <p className="text-base font-bold text-foreground mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 self-start text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Checkout Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="text-xl font-bold text-foreground">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl btn-glow text-lg"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>
    </div>
  );
}
