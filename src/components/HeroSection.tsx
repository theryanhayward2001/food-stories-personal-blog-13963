import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative rounded-[2.5rem] overflow-hidden bg-muted my-12 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-12 p-12 md:p-16 lg:p-20">
        {/* Left side - Image */}
        <div className="relative aspect-[4/3] md:aspect-auto rounded-[2rem] overflow-hidden animate-scale-in">
          <img
            src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&q=80"
            alt="Hero"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight animate-slide-down">
              Journey Through Life's Spectrum
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl animate-slide-up stagger-1">
              Welcome to Perspective's Blog: A Realm of Reflection, Inspiration, and Discovery. 
              Where Words Illuminate Paths of Meaning and Thoughts Unravel the Mysteries of Life's Spectrum.
            </p>
          </div>

          <div className="flex items-center gap-6 pt-4 animate-slide-up stagger-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-base font-medium transition-all hover:scale-105">
              Join Now
            </Button>
            
            <div className="flex items-center gap-4">
              <a
                href="#instagram"
                className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#facebook"
                className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#linkedin"
                className="w-12 h-12 rounded-full border-2 border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
