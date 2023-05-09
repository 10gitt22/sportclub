import { type FC, type ButtonHTMLAttributes, type DetailedHTMLProps } from "react"

type ButtonVariants = 'primary'

type ButtonProps = {
  className?: string
  variant?: ButtonVariants
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary', 
  ...otherProps
}) => {
  const relativeStyles = className
  return (
    <button className={`bg-primary hover:bg-primaryDarken duration-200 transition-colors px-5 py-2 text-black text-button rounded-[10px] ${relativeStyles ? relativeStyles : ''}`} {...otherProps}>{children}</button>
  )
}
