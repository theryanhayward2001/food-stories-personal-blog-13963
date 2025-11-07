import { Link } from "react-router-dom";

interface SocialLinksProps {
  variant?: "horizontal" | "vertical";
  className?: string;
  showNewsletter?: boolean;
}

const SocialLinks = ({ variant = "horizontal", className = "", showNewsletter = true }: SocialLinksProps) => {
  const containerClass = variant === "horizontal" 
    ? `flex items-center gap-6 ${className}`
    : `flex flex-col gap-4 ${className}`;
    
  const linkClass = "text-sm hover:text-primary transition-colors";
  
  return (
    <nav className={containerClass}>
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
      >
        Instagram
      </a>
      <a 
        href="https://twitter.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
      >
        Twitter
      </a>
      {showNewsletter && (
        <Link to="/#newsletter" className={linkClass}>
          Newsletter
        </Link>
      )}
    </nav>
  );
};

export default SocialLinks;
