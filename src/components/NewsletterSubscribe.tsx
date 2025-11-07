import { useState } from "react";
import { toast } from "sonner";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-dark-chocolate py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-serif mb-6 text-warm-cream">
            Join us on this tasty adventure
          </h3>
          <p className="text-warm-cream/70 mb-8">
            Subscribe to receive thoughtful stories about food, culture, and sustainable living delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-3 rounded-full bg-warm-cream/10 border border-warm-cream/20 text-warm-cream placeholder:text-warm-cream/50 focus:outline-none focus:ring-2 focus:ring-primary w-full sm:max-w-xs"
              required
              maxLength={255}
            />
            <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors cursor-pointer w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscribe;
