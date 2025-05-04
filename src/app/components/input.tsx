import { InputHTMLAttributes, forwardRef } from "react"
import clsx from "clsx"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const baseStyles = "block w-full border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
  const paddingStyles = "px-4 py-2"

  return (
    <input
      ref={ref}
      className={clsx(baseStyles, paddingStyles, className)}
      {...props}
    />
  )
})

Input.displayName = "Input"
export { Input }