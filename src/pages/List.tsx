import { useState } from "react";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";

interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  isFavorite: boolean;
  rating: number;
}

export default function List() {
  const [products] = useState<Product[]>([
     {
    id: "1",
    title: "Canon EOS R5 Mirrorless Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=450&fit=crop",
    price: 1500,
    period: "day",
    location: "Koramangala, Bangalore",
    rating: 4.8,
    reviews: 24,
    ownerName: "Priya S.",
    ownerBadge: "top",
    condition: "Like New",
    category: "cameras",
  },
  {
    id: "2",
    title: "Bosch Power Drill Kit",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=450&fit=crop",
    price: 300,
    period: "day",
    location: "Indiranagar, Bangalore",
    rating: 4.5,
    reviews: 18,
    ownerName: "Rahul M.",
    ownerBadge: "verified",
    condition: "Good",
    category: "tools",
  },
  {
    id: "3",
    title: "Trek Mountain Bike – 29er",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop",
    price: 800,
    period: "day",
    location: "HSR Layout, Bangalore",
    rating: 4.9,
    reviews: 32,
    ownerName: "Arjun K.",
    ownerBadge: "trusted",
    condition: "Like New",
    category: "bikes",
  },
  {
    id: "4",
    title: "4-Person Camping Tent",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=450&fit=crop",
    price: 500,
    period: "day",
    location: "Whitefield, Bangalore",
    rating: 4.6,
    reviews: 12,
    ownerName: "Sneha R.",
    ownerBadge: "verified",
    condition: "Good",
    category: "outdoor",
  },
  {
    id: "5",
    title: "MacBook Pro 16\" M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop",
    price: 2000,
    period: "day",
    location: "MG Road, Bangalore",
    rating: 4.7,
    reviews: 8,
    ownerName: "Vikram D.",
    ownerBadge: "top",
    condition: "Like New",
    category: "electronics",
  },
  {
    id: "6",
    title: "JBL PartyBox 310 Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=450&fit=crop",
    price: 1200,
    period: "day",
    location: "JP Nagar, Bangalore",
    rating: 4.4,
    reviews: 15,
    ownerName: "Meera L.",
    ownerBadge: "trusted",
    condition: "Good",
    category: "party",
  },
  {
    id: "7",
    title: "Sony PS5 + 2 Controllers",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=450&fit=crop",
    price: 600,
    period: "day",
    location: "Electronic City, Bangalore",
    rating: 4.8,
    reviews: 42,
    ownerName: "Karan P.",
    ownerBadge: "top",
    condition: "Like New",
    category: "gaming",
  },
  {
    id: "8",
    title: "Yamaha Acoustic Guitar",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=450&fit=crop",
    price: 200,
    period: "day",
    location: "Jayanagar, Bangalore",
    rating: 4.3,
    reviews: 9,
    ownerName: "Ananya B.",
    ownerBadge: "verified",
    condition: "Good",
    category: "music",
  },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = products.filter((item) => {
    const matchCategory =
      category === "all" || item.category === category;

    const matchSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Header */}
      <div className="bg-white shadow-sm  top-10 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 items-center">

            <div className="flex-1 relative sticky">
                <h1 className="font-bold text-center text-3xl mt-8 mb-8">Search Products </h1>
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5 mt-24" />

              <input
                type="text"
                placeholder="Search products or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
            </button>

          </div>
        </div>
      </div>

      {/* Listings */}
      <section className="container py-10 mb-32">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">
            Browse Rentals
          </h2>

          <Button variant="ghost" className="gap-1 text-primary">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          active={category}
          onChange={setCategory}
        />

        {/* Grid */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">
              No items found. Try a different search or category.
            </p>
          </div>
        )}

      </section>

      <Footer />

    </div>
  );
}