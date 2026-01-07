import { Heart } from 'lucide-react';

export default function WishlistScreen() {
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