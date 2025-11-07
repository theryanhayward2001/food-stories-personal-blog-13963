import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";

import foodPhilosophy from "@/assets/food-philosophy.jpg";
import sustainableFood from "@/assets/sustainable-food.jpg";
import seasonalEating from "@/assets/seasonal-eating.jpg";
import fermentation from "@/assets/fermentation.jpg";
import foodCulture from "@/assets/food-culture.jpg";

const blogPosts = [
  {
    id: "food-philosophy",
    title: "Why We Build Community Around Food",
    excerpt: "Food has always been more than sustenance. It's the thread that weaves through our most meaningful moments, creating bonds that transcend culture and time. Exploring how shared meals build lasting connections.",
    image: foodPhilosophy,
    category: "Philosophy",
    bgColor: "bg-warm-mustard"
  },
  {
    id: "slow-food",
    title: "The Art of Slow Food: Embracing Tradition in Modern Times",
    excerpt: "In our fast-paced world, the slow food movement reminds us to honor the craftspeople, traditions, and time-honored processes that give our food meaning and depth.",
    image: sustainableFood,
    category: "Culture",
    bgColor: "bg-warm-tan"
  },
  {
    id: "seasonal-eating",
    title: "Eating with the Seasons: Nature's Perfect Rhythm",
    excerpt: "Seasonal eating isn't just about freshness—it's about reconnecting with natural cycles, supporting local ecosystems, and discovering flavors at their peak. A guide to mindful, seasonal consumption.",
    image: seasonalEating,
    category: "Sustainability",
    bgColor: "bg-card"
  },
  {
    id: "fermentation",
    title: "The Science of Fermentation: Ancient Wisdom Meets Modern Health",
    excerpt: "Fermented foods have sustained civilizations for millennia. Today, science is revealing why these living foods are essential for gut health, immunity, and overall wellness.",
    image: fermentation,
    category: "Science",
    bgColor: "bg-warm-terracotta"
  },
  {
    id: "heirloom-varieties",
    title: "Heirloom Varieties: Preserving Food Diversity for Future Generations",
    excerpt: "Every heirloom tomato, heritage grain, and traditional variety carries stories of the farmers who preserved them. Understanding why biodiversity in our food system matters more than ever.",
    image: foodCulture,
    category: "Culture",
    bgColor: "bg-warm-mustard"
  }
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Stories");

  const filteredPosts = activeCategory === "All Stories" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            articleCount={filteredPosts.length}
          />
          
          <div className="space-y-12">
            {filteredPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
