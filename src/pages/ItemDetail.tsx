import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Shield, MessageCircle, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatingStars from "@/components/RatingStars";
import TrustBadge from "@/components/TrustBadge";
import { mockItems } from "@/data/mockItems";

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id);
  const [imgIndex, setImgIndex] = useState(0);

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="container flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="mb-2 font-heading text-2xl font-bold">Item Not Found</h2>
            <Link to="/" className="text-primary hover:underline">Back to Browse</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Simulate multiple images
  const images = [item.image, item.image, item.image];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="container py-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Browse
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Images */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
            >
              <img src={images[imgIndex]} alt={item.title} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {item.condition}
              </span>
              <div className="absolute right-4 top-4 flex gap-2">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition hover:bg-card">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition hover:bg-card">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`h-2 w-2 rounded-full transition ${i === imgIndex ? "bg-primary-foreground" : "bg-primary-foreground/40"}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                {item.ownerBadge && <TrustBadge level={item.ownerBadge} />}
              </div>

              <h1 className="mb-2 font-heading text-2xl font-bold md:text-3xl">{item.title}</h1>

              <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {item.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <RatingStars rating={item.rating} size={14} />
                  <span>{item.rating} ({item.reviews} reviews)</span>
                </span>
              </div>

              {/* Price Card */}
              <div className="mb-6 rounded-xl border border-border bg-card p-6">
                <div className="mb-4">
                  <span className="font-heading text-3xl font-bold text-primary">₹{item.price}</span>
                  <span className="text-muted-foreground">/{item.period}</span>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Select your rental dates</span>
                </div>

                <Button className="mb-3 w-full gap-2" size="lg">
                  <Calendar className="h-4 w-4" />
                  Book Now
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg">
                  <MessageCircle className="h-4 w-4" />
                  Message Owner
                </Button>
              </div>

              {/* Owner */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-heading text-sm font-bold text-primary">
                      {item.ownerName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.ownerName}</p>
                    <p className="text-xs text-muted-foreground">Member since 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-trust">
                  <Shield className="h-4 w-4" />
                  <span>Identity verified · Escrow protected</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ItemDetail;
