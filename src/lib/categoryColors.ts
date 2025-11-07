export const getCategoryColor = (category: string): string => {
  const normalized = category.toLowerCase();
  
  if (normalized.includes("philosophy")) return "bg-warm-mustard";
  if (normalized.includes("culture")) return "bg-warm-tan";
  if (normalized.includes("sustainability")) return "bg-primary";
  if (normalized.includes("science")) return "bg-warm-terracotta";
  if (normalized.includes("recipe")) return "bg-warm-terracotta";
  if (normalized.includes("editorial")) return "bg-secondary";
  
  return "bg-warm-tan";
};
