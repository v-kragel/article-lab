export type Variant = "subheading" | "text";

export interface TypographyProps {
  children: React.ReactNode;
  variant: Variant;
  className?: string;
}
