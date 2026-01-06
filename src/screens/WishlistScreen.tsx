import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistScreen() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (productId: string) => {
    const product = items.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <Heart size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground text-center">
          Your Wishlist is Empty
        </h2>
        <p className="text-muted-foreground text-center mt-2">
          Save items you love to your wishlist
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-display text-xl font-bold text-foreground">
            My Wishlist ({items.length})
          </h1>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="px-4 py-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-card rounded-xl p-4 shadow-card"
            >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-lg bg-secondary overflow-hidden flex-shrink-0 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.discount && (
                    <span className="absolute top-1 left-1 badge-primary text-[8px]">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-primary font-medium">
                    {product.partNumber}
                  </p>
                  <h3 className="text-sm font-medium text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-1">
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="p-2 self-start text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddToCart(product.id)}
                disabled={!product.inStock}
                className={`w-full mt-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={18} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
