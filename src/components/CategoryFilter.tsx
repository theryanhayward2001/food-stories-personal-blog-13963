import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories = ["All Stories", "Philosophy", "Culture", "Sustainability", "Science"];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  articleCount: number;
}

const CategoryFilter = ({ activeCategory, onCategoryChange, articleCount }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const displayTopic = activeCategory === "All Stories" ? "Topic" : activeCategory;

  return (
    <div className="mb-12 relative" ref={dropdownRef} style={{ transform: "rotate(-0.3deg)" }}>
      <h2 className="text-3xl font-serif">
        <span className="text-foreground">
          Filter {articleCount} {articleCount === 1 ? "article" : "articles"} by{" "}
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center gap-2 cursor-pointer group">
          <span className="text-primary font-bold underline decoration-2 underline-offset-4 hover:decoration-primary">
            {displayTopic}
          </span>
          {isOpen ? <ChevronUp className="w-6 h-6 text-primary" /> : <ChevronDown className="w-6 h-6 text-primary" />}
        </button>
      </h2>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-background border-2 border-foreground rounded-[4px] z-50 min-w-[240px] py-2" style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)", transform: "rotate(0.3deg)" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-6 py-3 transition-colors cursor-pointer font-bold ${
                activeCategory === category
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
