import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  ShoppingCart, 
  ChevronRight,
  Check,
  X,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react';
import { Product, getRelatedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onProductPress?: (product: Product) => void;
}

export default function ProductDetailScreen({ product, onBack, onProductPress }: ProductDetailScreenProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const images = product.images || [product.image];
  const relatedProducts = getRelatedProducts(product, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="icon-btn w-10 h-10"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="icon-btn w-10 h-10"
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="icon-btn w-10 h-10"
            >
              <Heart size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-secondary">
        {/* Main Image */}
        <div className="aspect-square overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImageIndex}
              src={images[selectedImageIndex]}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 left-4 badge-primary text-sm">
            -{product.discount}% OFF
          </div>
        )}

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
            {images.map((img, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImageIndex === index 
                    ? 'border-primary' 
                    : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>
        )}

        {/* Image Dots Indicator */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-xs font-medium text-foreground">
            {selectedImageIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 pt-6">
        {/* Part Number & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {product.partNumber}
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-display text-xl font-bold text-foreground leading-tight">
          {product.name}
        </h1>

        {/* Category */}
        <p className="text-sm text-muted-foreground mt-1">
          {product.category} • {product.subCategory}
        </p>

        {/* Price Section */}
        <div className="mt-4 p-4 bg-card rounded-xl border border-border">
          <div className="flex items-end gap-3">
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-sm text-green-500 font-medium mt-1">
              You save {formatPrice(savings)} ({product.discount}% off)
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            Inclusive of all taxes
          </p>
        </div>

        {/* Stock Status */}
        <div className="mt-4 flex items-center gap-2">
          {product.inStock ? (
            <>
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check size={12} className="text-green-500" />
              </div>
              <span className="text-sm font-medium text-green-500">In Stock</span>
              <span className="text-xs text-muted-foreground">• Ready to ship</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center">
                <X size={12} className="text-destructive" />
              </div>
              <span className="text-sm font-medium text-destructive">Out of Stock</span>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center text-center p-3 bg-card rounded-xl">
            <Truck size={20} className="text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Free Shipping</span>
            <span className="text-[10px] text-muted-foreground">Above ₹5000</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-card rounded-xl">
            <Shield size={20} className="text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Genuine Part</span>
            <span className="text-[10px] text-muted-foreground">100% Authentic</span>
          </div>
          <div className="flex flex-col items-center text-center p-3 bg-card rounded-xl">
            <RotateCcw size={20} className="text-primary mb-2" />
            <span className="text-xs font-medium text-foreground">Easy Return</span>
            <span className="text-[10px] text-muted-foreground">7 Days</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-3">
            Description
          </h2>
          <p className={`text-sm text-muted-foreground leading-relaxed ${!showFullDescription ? 'line-clamp-3' : ''}`}>
            {product.description}
          </p>
          {product.description.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-primary font-medium mt-2"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">
              Specifications
            </h2>
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              {product.specifications.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`flex items-center justify-between p-3 ${
                    index !== product.specifications!.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-sm text-muted-foreground">{spec.label}</span>
                  <span className="text-sm font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold text-foreground">
                Related Products
              </h2>
              <button className="text-sm text-primary font-medium flex items-center gap-1">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={relatedProduct} 
                    onPress={() => onProductPress?.(relatedProduct)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 pb-6">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="icon-btn w-14 h-14 border border-primary"
          >
            <Heart size={22} className="text-primary" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={!product.inStock}
            className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
              product.inStock
                ? 'bg-primary text-primary-foreground btn-glow'
                : 'bg-secondary text-muted-foreground cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={20} />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}