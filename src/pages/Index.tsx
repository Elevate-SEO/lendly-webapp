import { useState } from "react";
import { Search, MapPin, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import CategoryFilter from "@/components/CategoryFilter";
import TrustBadge from "@/components/TrustBadge";
import heroImage from "@/assets/hero-lendly.jpg";
import { mockItems } from "@/data/mockItems";

const Index = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = mockItems.filter((item) => {
    const matchCat = category === "all" || item.category === category;
    const matchSearch =
      !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Share anything" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="container relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <TrustBadge level="verified" size="md" />
              <span className="text-sm text-primary-foreground/70">100% Verified Lenders</span>
            </div>
            <h1 className="mb-4 font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Rent Anything,
              <br />
              <span className="text-secondary">From Anyone</span>
            </h1>
            <p className="mb-8 max-w-md text-base text-primary-foreground/70 md:text-lg">
              The trusted marketplace to borrow cameras, tools, bikes, and more from verified people near you.
            </p>

            {/* Search Bar */}
            <div className="flex gap-2 rounded-xl bg-card/95 p-2 shadow-xl backdrop-blur-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search cameras, tools, bikes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="relative hidden sm:block sm:flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
                />
              </div>
              <Button className="gap-2 px-6">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card">
        <div className="container flex flex-wrap items-center justify-center gap-8 py-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-trust" />
            <span>Escrow-Protected Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>ID-Verified Users</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-warning" />
            <span>Damage Protection</span>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="container py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">Browse Rentals</h2>
          <Button variant="ghost" className="gap-1 text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <CategoryFilter active={category} onChange={setCategory} />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg">No items found. Try a different search or category.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Index;
