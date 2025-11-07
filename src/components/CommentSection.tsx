import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { z } from "zod";
import { Link } from "react-router-dom";

const commentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  content: z.string().trim().min(1, "Comment cannot be empty").max(1000, "Comment must be less than 1000 characters"),
});

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
    email: string | null;
    website: string | null;
  };
}

interface CommentSectionProps {
  articleId: string;
}

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Load user profile data if authenticated
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name, email, website")
          .eq("id", user.id)
          .single();

        if (profile) {
          setFormData((prev) => ({
            ...prev,
            name: profile.display_name || "",
            email: profile.email || user.email || "",
            website: profile.website || "",
          }));
        }
      }
      setLoadingProfile(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch comments
    fetchComments();

    return () => subscription.unsubscribe();
  }, [articleId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles (
          display_name,
          avatar_url,
          email,
          website
        )
      `)
      .eq("article_id", articleId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data || []);
    }
  };

  // Wait for profile to be created after signup
  const waitForProfile = async (userId: string, maxAttempts = 10): Promise<boolean> => {
    for (let i = 0; i < maxAttempts; i++) {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (data && !error) {
        console.log("Profile created successfully");
        return true;
      }

      console.log(`Waiting for profile creation... attempt ${i + 1}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms between attempts
    }

    console.error("Profile creation timeout");
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = commentSchema.parse(formData);
      setLoading(true);

      let userId = user?.id;

      // If user is not authenticated, create an account
      if (!user) {
        setIsCreatingAccount(true);

        // Generate a random password for auto-created account
        const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);

        console.log("Creating new account...");

        // Create the account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: validatedData.email,
          password: randomPassword,
          options: {
            emailRedirectTo: window.location.href,
            data: {
              display_name: validatedData.name,
            },
          },
        });

        if (signUpError) {
          console.error("Signup error:", signUpError);
          // Check if user already exists with this email
          if (signUpError.message.includes("already registered")) {
            toast.error("An account with this email already exists. Please log in to comment.");
            return;
          }
          throw signUpError;
        }

        if (!signUpData.user) {
          throw new Error("Failed to create account");
        }

        userId = signUpData.user.id;
        console.log("User created with ID:", userId);

        // Wait for profile to be created by the trigger
        const profileCreated = await waitForProfile(userId);
        if (!profileCreated) {
          throw new Error("Profile creation failed. Please try again.");
        }

        // Update profile with complete information
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            display_name: validatedData.name,
            email: validatedData.email,
            website: validatedData.website || null,
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Profile update error:", updateError);
          throw updateError;
        }

        console.log("Profile updated successfully");
        setIsCreatingAccount(false);
        toast.success("Account created! Your comment has been posted.");
      } else {
        // Update existing user profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            display_name: validatedData.name,
            email: validatedData.email,
            website: validatedData.website || null,
          })
          .eq("id", user.id);

        if (profileError) throw profileError;
      }

      // Insert comment
      console.log("Inserting comment for user:", userId);
      const { error: commentError } = await supabase.from("comments").insert({
        article_id: articleId,
        user_id: userId!,
        content: validatedData.content,
      });

      if (commentError) {
        console.error("Comment insert error:", commentError);
        throw commentError;
      }

      console.log("Comment inserted successfully");

      if (user) {
        toast.success("Comment posted!");
      }

      setFormData({
        name: "",
        email: "",
        website: "",
        content: "",
      });

      // Wait a moment before fetching to ensure database consistency
      await new Promise(resolve => setTimeout(resolve, 1000));
      fetchComments();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Comment submission error:", error);
        toast.error("Failed to post comment");
      }
    } finally {
      setLoading(false);
      setIsCreatingAccount(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <section id="comments" className="py-8 bg-warm-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-8 text-dark-chocolate">
            Comments ({comments.length})
          </h2>

          {/* Comment Form - Always visible */}
          <form onSubmit={handleSubmit} className="mb-12 space-y-4">
            <h3 className="text-xl font-serif text-dark-chocolate mb-6">Leave a Comment</h3>

            {!user && (
              <p className="text-sm text-dark-chocolate/60 mb-4">
                Your comment will automatically create an account for you.
              </p>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-dark-chocolate mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-full border border-dark-chocolate/20 bg-white text-dark-chocolate placeholder:text-dark-chocolate/50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loadingProfile || loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-dark-chocolate mb-2">
                Email <span className="text-primary">*</span>
                <span className="text-xs text-dark-chocolate/60 ml-2">(will not be published)</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-full border border-dark-chocolate/20 bg-white text-dark-chocolate placeholder:text-dark-chocolate/50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loadingProfile || loading}
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-dark-chocolate mb-2">
                Website <span className="text-xs text-dark-chocolate/60">(optional)</span>
              </label>
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-4 py-3 rounded-full border border-dark-chocolate/20 bg-white text-dark-chocolate placeholder:text-dark-chocolate/50 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loadingProfile || loading}
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-dark-chocolate mb-2">
                Comment <span className="text-primary">*</span>
              </label>
              <textarea
                id="comment"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 rounded-3xl border border-dark-chocolate/20 bg-white text-dark-chocolate placeholder:text-dark-chocolate/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={5}
                maxLength={1000}
                required
                disabled={loadingProfile || loading}
              />
              <div className="text-right mt-1">
                <span className="text-sm text-dark-chocolate/60">
                  {formData.content.length}/1000
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || loadingProfile || !formData.content.trim()}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 cursor-pointer"
            >
              {isCreatingAccount ? "Creating Account..." : loading ? "Posting..." : "Submit Comment"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-center text-dark-chocolate/60 py-12">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-6 rounded-3xl bg-white border border-dark-chocolate/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      {comment.profiles.avatar_url ? (
                        <img
                          src={comment.profiles.avatar_url}
                          alt={comment.profiles.display_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary font-semibold">
                          {comment.profiles.display_name[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {comment.profiles.website ? (
                          <a
                            href={comment.profiles.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-dark-chocolate hover:text-primary transition-colors"
                          >
                            {comment.profiles.display_name}
                          </a>
                        ) : (
                          <span className="font-medium text-dark-chocolate">
                            {comment.profiles.display_name}
                          </span>
                        )}
                        <span className="text-sm text-dark-chocolate/50">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-dark-chocolate/80 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;