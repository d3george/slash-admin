import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils/index"

const badgeVariants = cva(
  "inline-flex items-center px-2 py-0.5 justify-center border  text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
					"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
					"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				info: "border-transparent bg-info/20 text-info-dark [a&]:hover:bg-info/10 focus-visible:ring-info/20 dark:focus-visible:ring-info/40  dark:text-info-light",
				warning:
					"border-transparent bg-warning/20 text-warning-dark [a&]:hover:bg-warning/10 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 dark:text-warning-light",
				success: "border-transparent bg-success/20 text-success-dark [a&]:hover:bg-success/10 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:text-success-light",
				error: "border-transparent bg-error/20 text-error-dark [a&]:hover:bg-error/10 focus-visible:ring-error/20 dark:focus-visible:ring-error/40 dark:text-error-light",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
      overlay: {
        circle: "rounded-full min-w-5 h-5",
        square: "rounded-md",
        dot: "rounded-full w-2 h-2 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      overlay: "square",
    },
  }
)

function Badge({
  className,
  variant,
  overlay,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, overlay }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
