import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";
import SocialLinks from "./SocialLinks";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
              <span className="text-background text-sm font-bold">F</span>
            </div>
            <h1 className="text-xl font-serif font-normal text-foreground">
              Food Stories
            </h1>
          </Link>

          <div className="flex items-center space-x-8">
            <SocialLinks className="hidden md:flex" />
            
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer hidden md:flex"
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                  title="Log in"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <MobileMenu isLoggedIn={!!user} onLogout={handleLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
