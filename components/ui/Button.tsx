import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type Variant = 'cta' | 'ctaSecondary' | 'primary' | 'secondary'

type ButtonProps<T extends ElementType> = {
  renderAs?: T
  children: ReactNode
  className?: string
  variant: Variant
} & ComponentPropsWithoutRef<T>

export const BUTTON_STYLES: Record<Variant, string> = {
  cta: 'tracking-widest bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 px-16 py-4 rounded-full text-white font-bold text-xl',
  ctaSecondary:
    'block border-4 border-zinc-700 px-16 py-3 rounded-full text-zinc-100 font-bold text-xl uppercase hover:bg-zinc-100 hover:border-zinc-100 hover:text-black shadow-md transition-all duration-200',
  primary: 'font-bold px-6 py-2 border-b-2 rounded-md transition-colors',
  secondary:
    'bg-zinc-900 border-2 border-zinc-900 bg-opacity-20 py-2 px-6 flex items-center rounded-xl h-16 transition-all  hover:bg-opacity-100',
}

const Button = <T extends ElementType = 'button'>({
  renderAs,
  children,
  variant,
  className,
  ...rest
}: ButtonProps<T>): JSX.Element => {
  const Component: ElementType = renderAs ?? 'button'

  return (
    <Component
      className={[BUTTON_STYLES[variant], className].join(' ').trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}

export const MagicButton = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 animate-tilt transition duration-200"></div>
      <Button
        renderAs="a"
        href="https://discord.gg/HYsRmJVjSW"
        target="_blank"
        rel="noreferrer"
        className="relative block"
        variant="cta"
      >
        <span className="drop-shadow-md uppercase">Dołącz</span>
      </Button>
    </div>
  )
}

export default Button
