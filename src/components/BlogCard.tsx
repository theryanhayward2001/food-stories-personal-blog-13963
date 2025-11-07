import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogCardProps {
  id?: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  bgColor: string;
}

const BlogCard = ({ id, title, excerpt, image, category, bgColor }: BlogCardProps) => {
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!id) return;

      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("article_id", id);

      setCommentCount(count || 0);
    };

    fetchCommentCount();
  }, [id]);

  return (
    <Link to={id ? `/article/${id}` : "#"} className={`block group relative overflow-hidden ${bgColor} rounded-3xl p-8 md:p-12 hover:shadow-xl transition-all duration-500 cursor-pointer`}>
      {/* Organic decorative shape */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-background/10 rounded-full blur-2xl" />
      
      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        {/* Image side with organic shapes */}
        <div className="relative">
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
          <div className="relative rounded-3xl overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
        
        {/* Content side */}
        <div className="space-y-4">
          <div className="inline-block">
            <span className="text-xs font-medium text-dark-chocolate/70 tracking-wider uppercase">
              {category}
            </span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-serif leading-tight text-dark-chocolate">
            <span className="relative inline after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-dark-chocolate after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
              {title}
            </span>
          </h3>
          
          <p className="text-dark-chocolate/70 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center justify-between mt-4">
            <button className="group/btn inline-flex items-center text-dark-chocolate font-medium hover:gap-3 transition-all cursor-pointer">
              <span className="text-sm tracking-wide">READ MORE</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            <a
              href={`/article/${id}#comments`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-dark-chocolate/60 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
