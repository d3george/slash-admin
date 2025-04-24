import { cn } from "@/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 border-slate-300 pl-6 italic",
      list: "my-6 ml-6 list-disc [&>li]:mt-2",
      lead: "text-xl text-slate-700",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-slate-500",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {}

const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        className={cn(typographyVariants({ variant: "h1" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
H1.displayName = "H1";

const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        className={cn(typographyVariants({ variant: "h2" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
H2.displayName = "H2";

const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn(typographyVariants({ variant: "h3" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
H3.displayName = "H3";

const H4 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        className={cn(typographyVariants({ variant: "h4" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
H4.displayName = "H4";

const P = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(typographyVariants({ variant: "p" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
P.displayName = "P";

const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <blockquote
        className={cn(typographyVariants({ variant: "blockquote" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Blockquote.displayName = "Blockquote";

const List = forwardRef<HTMLUListElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={cn(typographyVariants({ variant: "list" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
List.displayName = "List";

const Lead = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(typographyVariants({ variant: "lead" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Lead.displayName = "Lead";

const Large = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(typographyVariants({ variant: "large" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Large.displayName = "Large";

const Small = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(typographyVariants({ variant: "small" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Small.displayName = "Small";

const Muted = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn(typographyVariants({ variant: "muted" }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Muted.displayName = "Muted";

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  Lead,
  Large,
  Small,
  Muted,
  typographyVariants,
};
