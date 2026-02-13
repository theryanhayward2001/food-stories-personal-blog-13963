import { Link } from "react-router-dom";
import NewsletterSubscribe from "./NewsletterSubscribe";

interface FooterProps {
  showNewsletter?: boolean;
}

const Footer = ({ showNewsletter = true }: FooterProps) => {
  return (
    <footer className="bg-foreground text-background border-t-2 border-foreground">
      {showNewsletter && <NewsletterSubscribe />}
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" style={{ transform: "rotate(-0.2deg)" }}>
          <div>
            <h3 className="text-xl font-serif mb-4">Food Stories</h3>
            <p className="text-background/70 text-sm">
              Exploring the intersection of food, culture, and sustainable living.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-background">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-background/70 hover:text-background text-sm transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-background/70 hover:text-background text-sm transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="block text-background/70 hover:text-background text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-background/70 hover:text-background text-sm transition-colors">
                Terms of Service
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-background">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Food Stories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
