import { ButtonHTMLAttributes, forwardRef } from "react"
import clsx from "clsx"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive"
  size?: "default" | "icon"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded focus:outline-none"
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    }
    const sizeStyles = {
      default: "px-4 py-2 text-sm",
      icon: "p-2",
    }

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
export { Button }