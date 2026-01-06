export interface Product {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  subCategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Hydraulics",
    icon: "💧",
    productCount: 156,
    subCategories: ["All", "Cylinders", "Pumps", "Valves", "Hoses", "Filters"]
  },
  {
    id: "2",
    name: "Electrical",
    icon: "⚡",
    productCount: 89,
    subCategories: ["All", "Sensors", "Switches", "Wiring", "Controllers", "Lights"]
  },
  {
    id: "3",
    name: "Powertrain",
    icon: "⚙️",
    productCount: 124,
    subCategories: ["All", "Engines", "Transmissions", "Gearboxes", "Axles", "Bearings"]
  },
  {
    id: "4",
    name: "Filters & Fluids",
    icon: "🛢️",
    productCount: 78,
    subCategories: ["All", "Oil Filters", "Air Filters", "Fuel Filters", "Hydraulic Oil", "Engine Oil"]
  },
  {
    id: "5",
    name: "Chassis",
    icon: "🔧",
    productCount: 92,
    subCategories: ["All", "Undercarriage", "Tracks", "Wheels", "Suspensions", "Frames"]
  },
  {
    id: "6",
    name: "Cab & Body",
    icon: "🚜",
    productCount: 67,
    subCategories: ["All", "Seats", "Glass", "Mirrors", "Doors", "Panels"]
  },
  {
    id: "7",
    name: "Hardware",
    icon: "🔩",
    productCount: 234,
    subCategories: ["All", "Bolts", "Nuts", "Washers", "Pins", "Clips"]
  },
  {
    id: "8",
    name: "Attachments",
    icon: "🏗️",
    productCount: 45,
    subCategories: ["All", "Buckets", "Forks", "Hooks", "Grabs", "Spreaders"]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hydraulic Cylinder Assembly",
    partNumber: "HYD-CYL-01",
    category: "Hydraulics",
    subCategory: "Cylinders",
    price: 24999,
    originalPrice: 29999,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    discount: 17,
    description: "High-performance hydraulic cylinder for ACE mobile cranes"
  },
  {
    id: "2",
    name: "Oil Filter Element",
    partNumber: "FLT-OIL-02",
    category: "Filters & Fluids",
    subCategory: "Oil Filters",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    discount: 13,
    description: "Genuine ACE oil filter for optimal engine protection"
  },
  {
    id: "3",
    name: "Control Valve Block",
    partNumber: "HYD-VLV-03",
    category: "Hydraulics",
    subCategory: "Valves",
    price: 45999,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    description: "Precision-engineered control valve for smooth crane operations"
  },
  {
    id: "4",
    name: "Boom Sensor Kit",
    partNumber: "ELE-SEN-04",
    category: "Electrical",
    subCategory: "Sensors",
    price: 8999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    discount: 18,
    description: "Complete sensor kit for boom position monitoring"
  },
  {
    id: "5",
    name: "Track Roller Assembly",
    partNumber: "CHS-TRK-05",
    category: "Chassis",
    subCategory: "Undercarriage",
    price: 12499,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    rating: 4.5,
    reviews: 56,
    inStock: false,
    description: "Heavy-duty track roller for crawler cranes"
  },
  {
    id: "6",
    name: "Operator Seat Premium",
    partNumber: "CAB-SET-06",
    category: "Cab & Body",
    subCategory: "Seats",
    price: 18999,
    originalPrice: 22999,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400",
    rating: 4.9,
    reviews: 178,
    inStock: true,
    discount: 17,
    description: "Ergonomic operator seat with lumbar support and suspension"
  },
  {
    id: "7",
    name: "Hydraulic Pump Main",
    partNumber: "HYD-PMP-07",
    category: "Hydraulics",
    subCategory: "Pumps",
    price: 89999,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
    rating: 4.8,
    reviews: 45,
    inStock: true,
    description: "High-pressure main hydraulic pump for crane operations"
  },
  {
    id: "8",
    name: "LED Work Light Kit",
    partNumber: "ELE-LGT-08",
    category: "Electrical",
    subCategory: "Lights",
    price: 4999,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    discount: 17,
    description: "High-intensity LED work lights for night operations"
  }
];

export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.discount && p.discount > 0);
