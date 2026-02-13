import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import heroImage from "@/assets/hero-editorial.jpg";

const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedEmail = emailSchema.parse(email);
      setIsSubmitting(true);

      setTimeout(() => {
        toast.success("Thanks for subscribing! Check your inbox soon.");
        setEmail("");
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Fresh organic produce and ingredients" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Centered Content Card */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div className="sharpie-card p-8 md:p-12" style={{ transform: "rotate(-0.8deg)" }}>
          {/* Logo Icon */}
          <div className="w-12 h-12 bg-foreground border-2 border-foreground rounded-full flex items-center justify-center mx-auto mb-8" style={{ transform: "rotate(1.5deg)" }}>
            <span className="text-background text-lg font-bold font-serif">F</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground mb-4 leading-tight" style={{ transform: "rotate(0.3deg)" }}>
            Food Stories
          </h1>

          {/* Newsletter Section */}
          <div className="max-w-md mx-auto">
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Subscribe to receive thoughtful stories about food, culture, and sustainable living delivered to your
              inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="sharpie-input flex-1 px-6 py-3 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none"
                required
                maxLength={255}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="sharpie-btn bg-primary text-primary-foreground px-6 py-3"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
