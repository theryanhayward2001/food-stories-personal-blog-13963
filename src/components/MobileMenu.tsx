import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import SocialLinks from "./SocialLinks";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const MobileMenu = ({ isLoggedIn, onLogout }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex-1 py-6">
            <nav className="space-y-4">
              <Link 
                to="/" 
                className="block text-lg hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block text-lg hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-lg hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
            
            <div className="mt-8 pt-8 border-t">
              <SocialLinks variant="vertical" showNewsletter={true} />
            </div>
          </div>
          
          <div className="border-t pt-4">
            {isLoggedIn ? (
              <Button 
                onClick={onLogout}
                variant="outline" 
                className="w-full"
              >
                Log Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
