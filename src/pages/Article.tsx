import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedPosts from "@/components/RelatedPosts";
import CommentSection from "@/components/CommentSection";
import { getFoodArticleById, getRelatedFoodArticles } from "@/data/foodArticles";
import { Facebook, Twitter, Link2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { getCategoryColor } from "@/lib/categoryColors";

const Article = () => {
  const { id } = useParams<{ id: string }>();
  const article = id ? getFoodArticleById(id) : undefined;
  
  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const relatedArticles = getRelatedFoodArticles(article.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-dark-chocolate/70 hover:text-primary transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to stories
          </Link>
        </div>

        {/* Hero Section with Organic Design */}
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-5xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-block px-6 py-2 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-dark-chocolate mb-6 leading-tight">
              {article.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-dark-chocolate/70 mb-8 font-serif italic leading-relaxed">
              {article.subtitle}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-dark-chocolate/60 mb-12">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime} read</span>
            </div>

            {/* Hero Image with Organic Treatment */}
            <div className="relative rounded-[3rem] overflow-hidden mb-12">
              <img
                src={article.image}
                alt={article.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>

            {/* Author Section */}
            <div className="flex items-center justify-between p-8 bg-warm-cream rounded-3xl mb-16">
              <div className="flex items-center gap-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-dark-chocolate text-lg">{article.author.name}</p>
                  <p className="text-sm text-dark-chocolate/70">{article.author.bio}</p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-full bg-white border border-dark-chocolate/20 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Copy link"
                >
                  <Link2 className="w-4 h-4 text-dark-chocolate" />
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-dark-chocolate/20 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-dark-chocolate" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-dark-chocolate/20 hover:border-primary hover:bg-primary/10 transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4 text-dark-chocolate" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 mb-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <p className="text-xl leading-relaxed text-dark-chocolate/80 mb-12 font-serif">
              {article.content.introduction}
            </p>

            {/* Content Sections */}
            {article.content.sections.map((section, index) => (
              <div key={index} className="mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-normal mb-6 text-dark-chocolate">{section.heading}</h2>
                <p className="text-lg leading-relaxed text-dark-chocolate/80 mb-8">
                  {section.content}
                </p>
                
                {section.image && (
                  <div className="my-12 -mx-8 md:-mx-16 lg:-mx-24 rounded-3xl overflow-hidden">
                    <img 
                      src={section.image} 
                      alt={section.heading}
                      className="w-full aspect-[3/2] object-cover"
                    />
                  </div>
                )}
                
                {section.quote && (
                  <blockquote className="my-12 p-8 md:p-12 bg-warm-mustard/20 rounded-3xl">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-dark-chocolate leading-relaxed">
                      "{section.quote}"
                    </p>
                  </blockquote>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-warm-cream border-l-4 border-primary">
              <p className="text-xl leading-relaxed font-serif text-dark-chocolate">
                {article.content.conclusion}
              </p>
            </div>

            {/* End of Article */}
            <hr className="mt-12 border-dark-chocolate/10" />

            {/* Mobile Share Buttons */}
            <div className="md:hidden mt-12 pt-12 border-t border-border">
              <p className="text-sm font-semibold mb-4 text-dark-chocolate">Share this story</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-3 rounded-full bg-warm-cream border border-dark-chocolate/20 hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Link2 className="w-4 h-4" />
                  <span className="text-sm">Copy link</span>
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-warm-cream border border-dark-chocolate/20 hover:border-primary transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-warm-cream border border-dark-chocolate/20 hover:border-primary transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <RelatedPosts
          posts={relatedArticles.map((article) => ({
            id: article.id,
            title: article.title,
            excerpt: article.subtitle,
            image: article.image,
          }))}
        />

        {/* Comment Section */}
        <CommentSection articleId={article.id} />
      </main>

      <Footer />
    </div>
  );
};

export default Article;
