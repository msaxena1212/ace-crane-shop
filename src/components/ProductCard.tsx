import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="product-card cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 badge-primary">
            -{product.discount}%
          </div>
        )}
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 icon-btn w-8 h-8"
        >
          <Heart 
            size={16} 
            className={inWishlist ? 'fill-primary text-primary' : 'text-muted-foreground'} 
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Part Number */}
        <p className="text-[10px] text-primary font-medium mb-1">{product.partNumber}</p>
        
        {/* Name */}
        <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star size={12} className="fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        {/* Price & Cart */}
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-base font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
          
          {product.inStock && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleCartClick}
              className="icon-btn w-9 h-9 bg-primary text-primary-foreground"
            >
              <ShoppingCart size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
