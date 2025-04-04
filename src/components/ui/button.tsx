
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 neo-button",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 shadow-[0_0_10px_rgba(0,188,212,0.3)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_0_10px_rgba(244,67,54,0.3)]",
        outline:
          "border border-input bg-transparent hover:bg-accent/10 hover:text-accent-foreground gradient-border",
        secondary:
          "bg-secondary/70 text-secondary-foreground hover:bg-secondary backdrop-blur-sm",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        coral: "bg-gradient-to-r from-coral-600 to-coral-500 text-white hover:from-coral-700 hover:to-coral-600 shadow-[0_0_10px_rgba(244,67,54,0.3)]",
        aqua: "bg-gradient-to-r from-aqua-600 to-aqua-400 text-white hover:from-aqua-700 hover:to-aqua-500 shadow-[0_0_10px_rgba(0,188,212,0.3)]",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
