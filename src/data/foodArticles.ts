export interface FoodArticle {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
      image?: string;
      quote?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
}

export const foodArticles: FoodArticle[] = [
  {
    id: "food-philosophy",
    title: "Why We Build Community Around Food",
    subtitle: "The universal language of shared meals and connection",
    category: "Philosophy",
    date: "Oct 14, 2025",
    readTime: "7 min",
    image: "/src/assets/food-philosophy.jpg",
    author: {
      name: "Sofia Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      bio: "Food anthropologist and cultural storyteller",
    },
    content: {
      introduction: "Across every culture and continent, food serves as more than fuel for our bodies. It's the centerpiece of celebration, the comfort in times of grief, and the bridge between strangers who become friends. The dinner table might be humanity's most important invention—not for the food it holds, but for the connections it creates.",
      sections: [
        {
          heading: "Breaking Bread, Building Bonds",
          content: "The phrase 'breaking bread' exists in nearly every language because the act is universal. When we share food, we're engaging in an ancient ritual of trust and reciprocity. You're vulnerable when you eat—our ancestors knew this. Choosing to eat together meant choosing to trust. That instinct still lives in us, which is why a shared meal feels different from simply eating in proximity to others.",
          image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
        },
        {
          heading: "Food as Cultural Identity",
          content: "Our grandmother's recipes, our family's holiday traditions, the street food of our childhood neighborhoods—these aren't just meals, they're pieces of who we are. Food carries memory, history, and belonging. When we share our food traditions with others, we're sharing our stories, our heritage, our very selves. It's an act of generosity and vulnerability.",
          quote: "When we share our food traditions with others, we're sharing our stories, our heritage, our very selves.",
        },
        {
          heading: "The Ritual of Gathering",
          content: "In our increasingly digital world, the dinner table remains stubbornly analog. You can't swipe through a conversation over dinner. You can't scroll past the person across from you. The ritual of sitting down together, of passing dishes and pouring wine, of staying present—it forces a kind of attention and connection that's becoming rare.",
          image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
        },
        {
          heading: "Creating New Traditions",
          content: "While honoring food traditions is beautiful, there's also power in creating new ones. The weekly potluck with neighbors, the monthly dinner party with friends, the tradition of trying a new restaurant each season—these rituals we create become the fabric of community. They give us something to look forward to and something to belong to.",
        },
      ],
      conclusion: "Food will always be about more than sustenance. It's about connection, culture, and community. In every shared meal, we're participating in something ancient and essential to being human. So next time you sit down with others, take a moment to appreciate not just the food on the table, but the connections around it.",
    },
    tags: ["food culture", "community", "tradition", "connection"],
  },
  {
    id: "slow-food",
    title: "The Art of Slow Food: Embracing Tradition in Modern Times",
    subtitle: "Rediscovering quality, craft, and connection in what we eat",
    category: "Culture",
    date: "Oct 10, 2025",
    readTime: "8 min",
    image: "/src/assets/sustainable-food.jpg",
    author: {
      name: "Marco Bellini",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      bio: "Slow food advocate and culinary historian",
    },
    content: {
      introduction: "Born in Italy as a protest against fast food culture, the slow food movement is about so much more than taking your time at dinner. It's a philosophy that honors the craftspeople who produce our food, the traditions that have sustained communities for generations, and the deep satisfaction that comes from knowing the story behind what we eat.",
      sections: [
        {
          heading: "What Slow Food Really Means",
          content: "Slow food isn't just about cooking slowly or eating slowly—though those are part of it. It's about valuing quality over convenience, tradition over trend, and sustainability over speed. It's choosing the artisan cheese maker over industrial production, the heirloom tomato over the perfectly uniform one, the neighborhood bakery over the supermarket.",
        },
        {
          heading: "The Craftspeople Behind Your Food",
          content: "Every truly good food has a story and a person behind it. The cheesemaker who ages wheels for years, the baker who starts their day at 3am, the farmer who knows each plant in their field—these are craftspeople, not just producers. When we choose slow food, we're choosing to support mastery, dedication, and traditional knowledge.",
        },
        {
          heading: "Taste as a Form of Knowledge",
          content: "The slow food movement teaches us to really taste—to notice the difference between a tomato picked ripe from the vine and one picked green to travel thousands of miles. This isn't snobbery; it's education. When we train our palates, we become more discerning consumers, better able to identify quality and to appreciate the work that goes into producing it.",
        },
        {
          heading: "Integrating Slow Food into Fast Lives",
          content: "You don't have to spend hours in the kitchen every day to embrace slow food principles. Start small: shop at farmers markets when you can, build relationships with local producers, learn the stories behind your favorite foods, cook one slow meal per week. Even fast lives have room for slow food values.",
        },
      ],
      conclusion: "The slow food movement isn't about returning to some idealized past—it's about bringing the best of traditional food wisdom into our modern lives. In a world that moves ever faster, choosing to slow down around food is an act of resistance and self-care. It's an investment in quality, community, and our collective food future.",
    },
    tags: ["slow food", "sustainability", "artisan", "food culture"],
  },
  {
    id: "seasonal-eating",
    title: "Eating with the Seasons: Nature's Perfect Rhythm",
    subtitle: "Why what you eat should change with the calendar",
    category: "Sustainability",
    date: "Oct 5, 2025",
    readTime: "6 min",
    image: "/src/assets/seasonal-eating.jpg",
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      bio: "Sustainable food systems advocate and seasonal cooking expert",
    },
    content: {
      introduction: "Modern supermarkets offer strawberries in December and butternut squash in June, creating an illusion that all foods are always available. But this convenience comes at a cost—to flavor, to the environment, and to our connection with the natural world. Eating seasonally isn't a restriction; it's a gateway to better taste, better health, and better sustainability.",
      sections: [
        {
          heading: "The Flavor Argument",
          content: "A tomato ripened in summer sunshine tastes fundamentally different from one grown in a greenhouse in winter. Seasonal produce is picked at peak ripeness, when nutrients and flavors are at their highest. It hasn't traveled thousands of miles or spent weeks in storage. The difference isn't subtle—it's transformative. Once you taste truly seasonal food, it's hard to go back.",
        },
        {
          heading: "Environmental Impact",
          content: "Eating seasonally and locally dramatically reduces the environmental footprint of your food. No energy spent heating greenhouses, no fuel burned shipping produce across continents, no chemicals required to force plants into unnatural growing cycles. It's one of the simplest, most impactful choices you can make for environmental sustainability.",
        },
        {
          heading: "Reconnecting with Natural Cycles",
          content: "Our ancestors ate seasonally by necessity. They anticipated spring's first greens, celebrated summer's abundance, preserved fall's harvest, and made peace with winter's limitations. This created a rhythm to the year, a sense of anticipation and gratitude. When we eat seasonally, we reconnect with these cycles and regain a sense of rootedness in time and place.",
        },
        {
          heading: "Getting Started with Seasonal Eating",
          content: "Start by learning what's in season in your region. Visit farmers markets and ask questions. Subscribe to a CSA box. Begin with one or two seasonal ingredients each week and build from there. You'll naturally develop an intuition for what's at its best when, and your cooking will become more creative as you work with seasonal constraints.",
        },
      ],
      conclusion: "Seasonal eating isn't about deprivation—it's about anticipation. It's about strawberries that taste like strawberries, tomatoes worth celebrating, and the simple pleasure of eating food at its absolute best. In aligning our plates with the seasons, we eat better, live lighter on the earth, and reconnect with the natural rhythms that sustained humanity for millennia.",
    },
    tags: ["seasonal eating", "sustainability", "local food", "farmers market"],
  },
  {
    id: "fermentation",
    title: "The Science of Fermentation: Ancient Wisdom Meets Modern Health",
    subtitle: "Why living foods deserve a place in your diet",
    category: "Science",
    date: "Sep 28, 2025",
    readTime: "7 min",
    image: "/src/assets/fermentation.jpg",
    author: {
      name: "Dr. James Liu",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
      bio: "Microbiologist and fermentation specialist",
    },
    content: {
      introduction: "Humans have been fermenting foods for over 10,000 years—long before we understood the science behind it. Our ancestors knew fermented foods lasted longer and often tasted better. Now, modern science is revealing that these living foods offer profound benefits for our health, particularly our gut microbiome, immune system, and overall wellness.",
      sections: [
        {
          heading: "What Is Fermentation?",
          content: "Fermentation is controlled decomposition—a process where beneficial bacteria, yeasts, or fungi break down food's components, creating new flavors, textures, and nutrients. It's how we get bread, cheese, wine, beer, yogurt, kimchi, sauerkraut, and countless other foods. Rather than something to fear, fermentation is a transformation we should celebrate.",
        },
        {
          heading: "The Gut Health Connection",
          content: "Your gut contains trillions of microorganisms that influence everything from digestion to mood to immune function. Fermented foods are rich in probiotics—beneficial bacteria that support this ecosystem. Regular consumption of fermented foods has been linked to improved digestion, reduced inflammation, better mental health, and stronger immunity.",
        },
        {
          heading: "Beyond Probiotics: Nutritional Benefits",
          content: "Fermentation doesn't just add beneficial bacteria—it can also increase nutrient availability and create new compounds. The fermentation process can increase B vitamins, improve mineral absorption, break down anti-nutrients, and create beneficial enzymes. In some cases, fermented foods are significantly more nutritious than their non-fermented versions.",
        },
        {
          heading: "Getting Started with Fermentation",
          content: "You don't need special equipment to start fermenting. Begin with simple projects like sauerkraut (just cabbage and salt) or homemade yogurt. Start with small amounts—fermented foods are powerful, and your gut needs time to adjust. As you gain confidence, you can explore more complex ferments like kimchi, kombucha, or sourdough bread.",
        },
      ],
      conclusion: "Fermentation is where ancient food wisdom and modern nutritional science converge. These living foods have sustained humanity for millennia, and research continues to reveal new reasons why they're essential for health. By incorporating fermented foods into your diet, you're participating in a tradition that connects you to both deep history and cutting-edge science.",
    },
    tags: ["fermentation", "probiotics", "gut health", "traditional foods"],
  },
  {
    id: "heirloom-varieties",
    title: "Heirloom Varieties: Preserving Food Diversity for Future Generations",
    subtitle: "Why your grandmother's tomato matters more than you think",
    category: "Culture",
    date: "Sep 20, 2025",
    readTime: "8 min",
    image: "/src/assets/food-culture.jpg",
    author: {
      name: "Sofia Chen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
      bio: "Food anthropologist and seed saving advocate",
    },
    content: {
      introduction: "Walk through a modern supermarket and you'll find perhaps three varieties of tomatoes. Yet seed banks hold thousands of varieties, each with unique flavors, colors, and stories. This loss of diversity isn't just about nostalgia—it's about resilience, nutrition, culture, and the future of our food system. Heirloom varieties are living history, and they need our protection.",
      sections: [
        {
          heading: "What Makes Something Heirloom?",
          content: "Heirloom varieties are open-pollinated plants that have been passed down through generations, usually for 50 years or more. Unlike hybrid varieties created for shipping durability or uniform appearance, heirlooms were selected for flavor, adaptation to local conditions, and cultural significance. Each variety carries the story of the people who saved and shared it.",
        },
        {
          heading: "The Crisis of Crop Diversity",
          content: "We've lost an estimated 75% of agricultural crop diversity in the last century. This monoculture approach—growing fewer varieties on a massive scale—makes our food system vulnerable to disease, climate change, and pest outbreaks. Heirloom varieties represent genetic diversity we may desperately need as growing conditions change.",
        },
        {
          heading: "Flavor and Nutrition Rediscovered",
          content: "Commercial breeding prioritized appearance, shelf life, and shipping durability over flavor and nutrition. Heirlooms, bred for different values, often taste dramatically better and can contain higher levels of nutrients and beneficial compounds. That Cherokee Purple tomato or Scarlet Nantes carrot isn't just pretty—it's more nutritious and delicious than commercial varieties.",
        },
        {
          heading: "Becoming a Steward",
          content: "You can participate in preserving food diversity. Grow heirloom varieties in your garden, even in containers. Save seeds and share them with others. Support farmers who grow diverse crops. Join a seed library. Buy heirloom varieties at farmers markets. Each action contributes to keeping these varieties—and their stories—alive.",
        },
      ],
      conclusion: "Heirloom varieties are more than quaint relics of the past—they're keys to a more resilient, flavorful, and culturally rich food future. Every seed saved is an act of preservation, every heirloom planted is a vote for diversity. In protecting these varieties, we're protecting not just genetic material, but stories, traditions, and possibilities for generations to come.",
    },
    tags: ["heirloom", "biodiversity", "seed saving", "food culture"],
  },
];

export const getFoodArticleById = (id: string): FoodArticle | undefined => {
  return foodArticles.find(article => article.id === id);
};

export const getRelatedFoodArticles = (currentId: string, category?: string): FoodArticle[] => {
  const currentArticle = getFoodArticleById(currentId);
  if (!currentArticle) return [];

  // First, try to get articles from the same category
  const sameCategory = foodArticles
    .filter(article =>
      article.id !== currentId &&
      (category ? article.category === category : article.category === currentArticle.category)
    );

  // If we have enough articles from the same category, return them
  if (sameCategory.length >= 3) {
    return sameCategory.slice(0, 3);
  }

  // Otherwise, fill with other articles
  const otherArticles = foodArticles
    .filter(article => article.id !== currentId && !sameCategory.includes(article));

  return [...sameCategory, ...otherArticles].slice(0, 3);
};
